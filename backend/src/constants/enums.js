export const CATEGORIES = Object.freeze({
  PLANNER: 'planner',
  PERFORMER: 'performer',
  CREW: 'crew',
});
export const CATEGORY_VALUES = Object.values(CATEGORIES);

export const EVENT_TYPES = [
  'wedding', 'corporate', 'concert', 'festival', 'birthday',
  'conference', 'exhibition', 'private_party', 'other',
];
export const DATE_TYPES = ['single', 'range'];
export const REQUIREMENT_STATUS = ['open', 'closed'];

// Planner
export const PLANNER_SERVICES = [
  'full_planning', 'decor', 'catering', 'venue_sourcing',
  'logistics', 'vendor_management', 'guest_management', 'on_day_coordination',
];
export const PLANNING_STAGES = ['idea', 'in_progress', 'finalizing'];

// Performer
export const PERFORMER_TYPES = [
  'singer', 'dancer', 'dj', 'live_band', 'anchor',
  'comedian', 'magician', 'instrumentalist', 'other',
];

// Crew
export const CREW_ROLES = [
  'sound', 'lighting', 'stage', 'security', 'photographer',
  'videographer', 'ushers', 'makeup', 'other',
];
export const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'expert'];
