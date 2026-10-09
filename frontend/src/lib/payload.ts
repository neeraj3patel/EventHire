import type { Category } from '@/lib/constants';
import type { CreateRequirementPayload, EventBasicsPayload } from '@/types/requirement';
import type { BasicsValues } from '@/lib/validations/basics.schema';
import { plannerFormSchema } from '@/lib/validations/planner.schema';
import { performerFormSchema } from '@/lib/validations/performer.schema';
import { crewFormSchema } from '@/lib/validations/crew.schema';

export type CategoryData = Record<Category, Record<string, unknown>>;

const optNum = (v: string) => (v.trim() === '' ? undefined : Number(v));
const optText = (v: string) => v.trim() || undefined;
const list = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean);

/** Turns validated form state (strings) into the typed API payload. Returns null if incomplete. */
export function buildPayload(basics: BasicsValues, data: CategoryData): CreateRequirementPayload | null {
  const base: EventBasicsPayload = {
    eventName: basics.eventName.trim(),
    eventType: basics.eventType,
    dateType: basics.dateType,
    startDate: basics.startDate,
    endDate: basics.dateType === 'range' ? basics.endDate : undefined,
    location: basics.location.trim(),
    venue: optText(basics.venue),
  };

  switch (basics.category) {
    case 'planner': {
      const parsed = plannerFormSchema.safeParse(data.planner);
      if (!parsed.success) return null;
      const v = parsed.data;
      return {
        ...base,
        category: 'planner',
        details: {
          services: v.services,
          planningStage: v.planningStage,
          guestCount: Number(v.guestCount),
          budgetMin: optNum(v.budgetMin),
          budgetMax: optNum(v.budgetMax),
          notes: optText(v.notes),
        },
      };
    }
    case 'performer': {
      const parsed = performerFormSchema.safeParse(data.performer);
      if (!parsed.success) return null;
      const v = parsed.data;
      return {
        ...base,
        category: 'performer',
        details: {
          performerType: v.performerType,
          genres: list(v.genres),
          performersNeeded: Number(v.performersNeeded),
          durationMinutes: Number(v.durationMinutes),
          budgetPerPerformer: Number(v.budgetPerPerformer),
          equipmentProvided: v.equipmentProvided,
          languages: list(v.languages),
          notes: optText(v.notes),
        },
      };
    }
    case 'crew': {
      const parsed = crewFormSchema.safeParse(data.crew);
      if (!parsed.success) return null;
      const v = parsed.data;
      return {
        ...base,
        category: 'crew',
        details: {
          roles: v.roles.map((r) => ({ role: r.role, count: Number(r.count) })),
          experienceLevel: v.experienceLevel,
          shiftHours: Number(v.shiftHours),
          numberOfDays: Number(v.numberOfDays),
          budgetPerDay: Number(v.budgetPerDay),
          accommodationProvided: v.accommodationProvided,
          transportProvided: v.transportProvided,
          notes: optText(v.notes),
        },
      };
    }
  }
}
