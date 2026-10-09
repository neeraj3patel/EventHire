import { z } from 'zod';
import { PERFORMER_TYPE_VALUES } from '@/lib/constants';
import { notesField, requiredNumber } from './helpers';

export const performerStepTwoSchema = z.object({
  performerType: z.enum(PERFORMER_TYPE_VALUES, {
    errorMap: () => ({ message: 'Select a performer type' }),
  }),
  genres: z.string().max(200, 'Keep this under 200 characters'),
  performersNeeded: requiredNumber('Number of performers', { min: 1, max: 50, int: true }),
});

export const performerStepThreeSchema = z.object({
  durationMinutes: requiredNumber('Duration', { min: 5, max: 720, int: true }),
  budgetPerPerformer: requiredNumber('Budget per performer', { min: 0 }),
  equipmentProvided: z.boolean(),
  languages: z.string().max(200, 'Keep this under 200 characters'),
  notes: notesField,
});

export const performerFormSchema = performerStepTwoSchema.and(performerStepThreeSchema);
