import type {
  Category, CrewRole, DateType, EventType, ExperienceLevel,
  PerformerType, PlannerService, PlanningStage,
} from '@/lib/constants';

export interface EventBasicsPayload {
  eventName: string;
  eventType: EventType;
  dateType: DateType;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  location: string;
  venue?: string;
}

export interface PlannerDetails {
  services: PlannerService[];
  planningStage: PlanningStage;
  guestCount: number;
  budgetMin?: number;
  budgetMax?: number;
  notes?: string;
}

export interface PerformerDetails {
  performerType: PerformerType;
  genres: string[];
  performersNeeded: number;
  durationMinutes: number;
  budgetPerPerformer: number;
  equipmentProvided: boolean;
  languages: string[];
  notes?: string;
}

export interface CrewDetails {
  roles: { role: CrewRole; count: number }[];
  experienceLevel: ExperienceLevel;
  shiftHours: number;
  numberOfDays: number;
  budgetPerDay: number;
  accommodationProvided: boolean;
  transportProvided: boolean;
  notes?: string;
}

export type CategoryDetails =
  | { category: 'planner'; details: PlannerDetails }
  | { category: 'performer'; details: PerformerDetails }
  | { category: 'crew'; details: CrewDetails };

export type CreateRequirementPayload = EventBasicsPayload & CategoryDetails;

export type Requirement = Omit<EventBasicsPayload, 'endDate'> & {
  _id: string;
  endDate: string;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
} & CategoryDetails;

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiList<T> extends ApiSuccess<T[]> {
  meta: Pagination;
}

export type { Category };
