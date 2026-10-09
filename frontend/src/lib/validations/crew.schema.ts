import { z } from 'zod';
import { CREW_ROLE_VALUES, EXPERIENCE_LEVEL_VALUES } from '@/lib/constants';
import { notesField, requiredNumber } from './helpers';

export const crewStepTwoSchema = z.object({
  roles: z
    .array(
      z.object({
        role: z.enum(CREW_ROLE_VALUES),
        count: requiredNumber('Count', { min: 1, max: 500, int: true }),
      }),
    )
    .min(1, 'Select at least one crew role'),
  experienceLevel: z.enum(EXPERIENCE_LEVEL_VALUES, {
    errorMap: () => ({ message: 'Select an experience level' }),
  }),
});

export const crewStepThreeSchema = z.object({
  shiftHours: requiredNumber('Shift length', { min: 1, max: 24 }),
  numberOfDays: requiredNumber('Number of days', { min: 1, max: 365, int: true }),
  budgetPerDay: requiredNumber('Budget per day', { min: 0 }),
  accommodationProvided: z.boolean(),
  transportProvided: z.boolean(),
  notes: notesField,
});

export const crewFormSchema = crewStepTwoSchema.and(crewStepThreeSchema);
