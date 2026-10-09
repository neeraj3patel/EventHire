import { label, type Category, type DateType, type EventType } from '@/lib/constants';
import type { CategoryDetails } from '@/types/requirement';

export interface Row {
  label: string;
  value: string;
}

const row = (name: string, value?: string | number | null): Row | null =>
  value === undefined || value === null || value === '' ? null : { label: name, value: String(value) };

const compact = (rows: (Row | null)[]) => rows.filter((r): r is Row => r !== null);

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso),
  );

export const formatDates = (dateType: DateType, start: string, end?: string) =>
  dateType === 'range' && end ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start);

const yesNo = (v: boolean) => (v ? 'Yes' : 'No');

export interface BasicsLike {
  category: Category;
  eventName: string;
  eventType: EventType;
  dateType: DateType;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
}

export function describeBasics(b: BasicsLike): Row[] {
  return compact([
    row('Event name', b.eventName),
    row('Event type', label(b.eventType)),
    row('Date', formatDates(b.dateType, b.startDate, b.endDate)),
    row('Location', b.location),
    row('Venue', b.venue),
  ]);
}

export function describeDetails(item: CategoryDetails): Row[] {
  switch (item.category) {
    case 'planner': {
      const d = item.details;
      const budget =
        d.budgetMin !== undefined && d.budgetMax !== undefined
          ? `${formatCurrency(d.budgetMin)} – ${formatCurrency(d.budgetMax)}`
          : d.budgetMin !== undefined
            ? `From ${formatCurrency(d.budgetMin)}`
            : d.budgetMax !== undefined
              ? `Up to ${formatCurrency(d.budgetMax)}`
              : undefined;
      return compact([
        row('Services', d.services.map(label).join(', ')),
        row('Planning stage', label(d.planningStage)),
        row('Guests', d.guestCount.toLocaleString('en-IN')),
        row('Budget', budget),
        row('Notes', d.notes),
      ]);
    }
    case 'performer': {
      const d = item.details;
      return compact([
        row('Performer type', label(d.performerType)),
        row('Genres / style', d.genres.join(', ')),
        row('Performers needed', d.performersNeeded),
        row('Duration', `${d.durationMinutes} min`),
        row('Budget per performer', formatCurrency(d.budgetPerPerformer)),
        row('Equipment provided', yesNo(d.equipmentProvided)),
        row('Languages', d.languages.join(', ')),
        row('Notes', d.notes),
      ]);
    }
    case 'crew': {
      const d = item.details;
      return compact([
        row('Roles', d.roles.map((r) => `${label(r.role)} × ${r.count}`).join(', ')),
        row('Experience', label(d.experienceLevel)),
        row('Shift length', `${d.shiftHours} hrs/day`),
        row('Days', d.numberOfDays),
        row('Budget per day', formatCurrency(d.budgetPerDay)),
        row('Accommodation', yesNo(d.accommodationProvided)),
        row('Transport', yesNo(d.transportProvided)),
        row('Notes', d.notes),
      ]);
    }
  }
}
