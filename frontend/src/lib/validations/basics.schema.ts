import { z } from 'zod';
import { CATEGORY_VALUES, DATE_TYPE_VALUES, EVENT_TYPE_VALUES } from '@/lib/constants';
import { todayISO } from '@/lib/utils';

export const basicsSchema = z
  .object({
    eventName: z.string().trim().min(3, 'Event name must be at least 3 characters').max(120),
    eventType: z.enum(EVENT_TYPE_VALUES, { errorMap: () => ({ message: 'Select an event type' }) }),
    category: z.enum(CATEGORY_VALUES, { errorMap: () => ({ message: 'Choose who you are looking for' }) }),
    dateType: z.enum(DATE_TYPE_VALUES),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string(),
    location: z.string().trim().min(2, 'Location is required').max(200),
    venue: z.string().trim().max(200),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.startDate < todayISO()) {
      ctx.addIssue({ code: 'custom', path: ['startDate'], message: 'Start date cannot be in the past' });
    }
    if (data.dateType === 'range') {
      if (!data.endDate) {
        ctx.addIssue({ code: 'custom', path: ['endDate'], message: 'End date is required for a date range' });
      } else if (data.startDate && data.endDate < data.startDate) {
        ctx.addIssue({ code: 'custom', path: ['endDate'], message: 'End date cannot be before start date' });
      }
    }
  });

export type BasicsValues = z.infer<typeof basicsSchema>;
