import { z } from 'zod';
import { PLANNER_SERVICE_VALUES, PLANNING_STAGE_VALUES } from '@/lib/constants';
import { notesField, optionalNumber, requiredNumber } from './helpers';

export const plannerStepTwoSchema = z.object({
  services: z.array(z.enum(PLANNER_SERVICE_VALUES)).min(1, 'Select at least one service'),
  planningStage: z.enum(PLANNING_STAGE_VALUES, {
    errorMap: () => ({ message: 'Select the planning stage' }),
  }),
  guestCount: requiredNumber('Guest count', { min: 1, max: 100000, int: true }),
});

export const plannerStepThreeSchema = z
  .object({ budgetMin: optionalNumber, budgetMax: optionalNumber, notes: notesField })
  .superRefine((d, ctx) => {
    if (d.budgetMin !== '' && d.budgetMax !== '' && Number(d.budgetMin) > Number(d.budgetMax)) {
      ctx.addIssue({ code: 'custom', path: ['budgetMax'], message: 'Max budget must be at least the min budget' });
    }
  });

export const plannerFormSchema = plannerStepTwoSchema.and(plannerStepThreeSchema);
