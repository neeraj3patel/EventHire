import { ClipboardList, HardHat, Mic, type LucideIcon } from 'lucide-react';

export const CATEGORY_VALUES = ['planner', 'performer', 'crew'] as const;
export type Category = (typeof CATEGORY_VALUES)[number];

export const EVENT_TYPE_VALUES = [
  'wedding', 'corporate', 'concert', 'festival', 'birthday',
  'conference', 'exhibition', 'private_party', 'other',
] as const;
export type EventType = (typeof EVENT_TYPE_VALUES)[number];

export const DATE_TYPE_VALUES = ['single', 'range'] as const;
export type DateType = (typeof DATE_TYPE_VALUES)[number];

export const PLANNER_SERVICE_VALUES = [
  'full_planning', 'decor', 'catering', 'venue_sourcing',
  'logistics', 'vendor_management', 'guest_management', 'on_day_coordination',
] as const;
export type PlannerService = (typeof PLANNER_SERVICE_VALUES)[number];

export const PLANNING_STAGE_VALUES = ['idea', 'in_progress', 'finalizing'] as const;
export type PlanningStage = (typeof PLANNING_STAGE_VALUES)[number];

export const PERFORMER_TYPE_VALUES = [
  'singer', 'dancer', 'dj', 'live_band', 'anchor',
  'comedian', 'magician', 'instrumentalist', 'other',
] as const;
export type PerformerType = (typeof PERFORMER_TYPE_VALUES)[number];

export const CREW_ROLE_VALUES = [
  'sound', 'lighting', 'stage', 'security', 'photographer',
  'videographer', 'ushers', 'makeup', 'other',
] as const;
export type CrewRole = (typeof CREW_ROLE_VALUES)[number];

export const EXPERIENCE_LEVEL_VALUES = ['beginner', 'intermediate', 'expert'] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_VALUES)[number];

const LABEL_OVERRIDES: Record<string, string> = { dj: 'DJ', in_progress: 'In progress' };

/** "private_party" -> "Private party" */
export function label(value: string): string {
  if (LABEL_OVERRIDES[value]) return LABEL_OVERRIDES[value];
  const text = value.replace(/_/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const toOptions = <T extends string>(values: readonly T[]) =>
  values.map((value) => ({ value, label: label(value) }));

export const CATEGORY_META: Record<
  Category,
  { label: string; description: string; icon: LucideIcon }
> = {
  planner: {
    label: 'Event Planner',
    description: 'Plan, coordinate and manage the whole event.',
    icon: ClipboardList,
  },
  performer: {
    label: 'Performer',
    description: 'Singers, DJs, dancers, bands and other acts.',
    icon: Mic,
  },
  crew: {
    label: 'Crew',
    description: 'Sound, lighting, stage, security and support staff.',
    icon: HardHat,
  },
};

export const STEP_LABELS: Record<Category, [string, string]> = {
  planner: ['Services & scope', 'Budget & notes'],
  performer: ['Act details', 'Budget & logistics'],
  crew: ['Crew needs', 'Shifts & budget'],
};

export const TOTAL_STEPS = 4;
