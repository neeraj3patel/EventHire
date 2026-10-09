import mongoose from 'mongoose';
import {
  CATEGORIES, EVENT_TYPES, DATE_TYPES, REQUIREMENT_STATUS,
  PLANNER_SERVICES, PLANNING_STAGES, PERFORMER_TYPES, CREW_ROLES, EXPERIENCE_LEVELS,
} from '../constants/enums.js';

const { Schema } = mongoose;

/**
 * One collection ("requirements"), three discriminators.
 * Every document carries `category` (planner | performer | crew) and a
 * category-specific `details` sub-document.
 */
const baseSchema = new Schema(
  {
    eventName: { type: String, required: true, trim: true, maxlength: 120 },
    eventType: { type: String, enum: EVENT_TYPES, required: true },
    dateType: { type: String, enum: DATE_TYPES, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }, // equals startDate for single-day events
    location: { type: String, required: true, trim: true, maxlength: 200 },
    venue: { type: String, trim: true, maxlength: 200 },
    status: { type: String, enum: REQUIREMENT_STATUS, default: 'open' },
  },
  { discriminatorKey: 'category', collection: 'requirements', timestamps: true, versionKey: false },
);

baseSchema.index({ category: 1, createdAt: -1 });
baseSchema.index({ eventType: 1 });
baseSchema.index({ startDate: 1 });

export const Requirement = mongoose.models.Requirement || mongoose.model('Requirement', baseSchema);

const notes = { type: String, trim: true, maxlength: 1000 };

const plannerDetails = new Schema(
  {
    services: { type: [{ type: String, enum: PLANNER_SERVICES }], validate: (v) => v.length > 0 },
    planningStage: { type: String, enum: PLANNING_STAGES, required: true },
    guestCount: { type: Number, required: true, min: 1 },
    budgetMin: { type: Number, min: 0 },
    budgetMax: { type: Number, min: 0 },
    notes,
  },
  { _id: false },
);

const performerDetails = new Schema(
  {
    performerType: { type: String, enum: PERFORMER_TYPES, required: true },
    genres: { type: [String], default: [] },
    performersNeeded: { type: Number, required: true, min: 1 },
    durationMinutes: { type: Number, required: true, min: 5 },
    budgetPerPerformer: { type: Number, required: true, min: 0 },
    equipmentProvided: { type: Boolean, default: false },
    languages: { type: [String], default: [] },
    notes,
  },
  { _id: false },
);

const crewDetails = new Schema(
  {
    roles: {
      type: [
        new Schema(
          {
            role: { type: String, enum: CREW_ROLES, required: true },
            count: { type: Number, required: true, min: 1 },
          },
          { _id: false },
        ),
      ],
      validate: (v) => v.length > 0,
    },
    experienceLevel: { type: String, enum: EXPERIENCE_LEVELS, required: true },
    shiftHours: { type: Number, required: true, min: 1, max: 24 },
    numberOfDays: { type: Number, required: true, min: 1 },
    budgetPerDay: { type: Number, required: true, min: 0 },
    accommodationProvided: { type: Boolean, default: false },
    transportProvided: { type: Boolean, default: false },
    notes,
  },
  { _id: false },
);

const build = (name, details) =>
  Requirement.discriminators?.[name] ||
  Requirement.discriminator(name, new Schema({ details: { type: details, required: true } }));

export const PlannerRequirement = build(CATEGORIES.PLANNER, plannerDetails);
export const PerformerRequirement = build(CATEGORIES.PERFORMER, performerDetails);
export const CrewRequirement = build(CATEGORIES.CREW, crewDetails);

export const REQUIREMENT_MODELS = {
  [CATEGORIES.PLANNER]: PlannerRequirement,
  [CATEGORIES.PERFORMER]: PerformerRequirement,
  [CATEGORIES.CREW]: CrewRequirement,
};
