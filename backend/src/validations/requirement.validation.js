import { z } from 'zod';
import {
  CATEGORIES, CATEGORY_VALUES, EVENT_TYPES, DATE_TYPES,
  PLANNER_SERVICES, PLANNING_STAGES, PERFORMER_TYPES, CREW_ROLES, EXPERIENCE_LEVELS,
} from '../constants/enums.js';

const optionalText = (max) =>
  z.string().trim().max(max).optional().transform((v) => v || undefined);

const tagList = z.array(z.string().trim().min(1).max(40)).max(10).default([]);

/* ---------- Step 1: event basics (shared) ---------- */
const basicsShape = z.object({
  eventName: z.string().trim().min(3, 'Event name must be at least 3 characters').max(120),
  eventType: z.enum(EVENT_TYPES),
  dateType: z.enum(DATE_TYPES),
  startDate: z.coerce.date({ invalid_type_error: 'Invalid start date' }),
  endDate: z.coerce.date({ invalid_type_error: 'Invalid end date' }).optional(),
  location: z.string().trim().min(2).max(200),
  venue: optionalText(200),
});

/* ---------- Steps 2 & 3: category-specific details ---------- */
const plannerDetails = z.object({
  services: z.array(z.enum(PLANNER_SERVICES)).min(1, 'Select at least one service'),
  planningStage: z.enum(PLANNING_STAGES),
  guestCount: z.number().int().min(1).max(100000),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  notes: optionalText(1000),
});

const performerDetails = z.object({
  performerType: z.enum(PERFORMER_TYPES),
  genres: tagList,
  performersNeeded: z.number().int().min(1).max(50),
  durationMinutes: z.number().int().min(5).max(720),
  budgetPerPerformer: z.number().min(0),
  equipmentProvided: z.boolean().default(false),
  languages: tagList,
  notes: optionalText(1000),
});

const crewDetails = z.object({
  roles: z
    .array(z.object({ role: z.enum(CREW_ROLES), count: z.number().int().min(1).max(500) }))
    .min(1, 'Select at least one crew role')
    .refine((r) => new Set(r.map((x) => x.role)).size === r.length, 'Duplicate crew roles'),
  experienceLevel: z.enum(EXPERIENCE_LEVELS),
  shiftHours: z.number().min(1).max(24),
  numberOfDays: z.number().int().min(1).max(365),
  budgetPerDay: z.number().min(0),
  accommodationProvided: z.boolean().default(false),
  transportProvided: z.boolean().default(false),
  notes: optionalText(1000),
});

/* ---------- Step 4: full submission ---------- */
export const createRequirementSchema = z
  .discriminatedUnion('category', [
    basicsShape.extend({ category: z.literal(CATEGORIES.PLANNER), details: plannerDetails }),
    basicsShape.extend({ category: z.literal(CATEGORIES.PERFORMER), details: performerDetails }),
    basicsShape.extend({ category: z.literal(CATEGORIES.CREW), details: crewDetails }),
  ])
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (data.startDate < today) {
      ctx.addIssue({ code: 'custom', path: ['startDate'], message: 'Start date cannot be in the past' });
    }
    if (data.dateType === 'range') {
      if (!data.endDate) {
        ctx.addIssue({ code: 'custom', path: ['endDate'], message: 'End date is required for a date range' });
      } else if (data.endDate < data.startDate) {
        ctx.addIssue({ code: 'custom', path: ['endDate'], message: 'End date cannot be before start date' });
      }
    }
    if (
      data.category === CATEGORIES.PLANNER &&
      data.details.budgetMin !== undefined &&
      data.details.budgetMax !== undefined &&
      data.details.budgetMin > data.details.budgetMax
    ) {
      ctx.addIssue({ code: 'custom', path: ['details', 'budgetMax'], message: 'Max budget must be ≥ min budget' });
    }
  });

export const listRequirementsQuerySchema = z.object({
  category: z.enum(CATEGORY_VALUES).optional(),
  eventType: z.enum(EVENT_TYPES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id'),
});
