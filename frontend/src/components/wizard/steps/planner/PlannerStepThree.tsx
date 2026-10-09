'use client';

import { plannerStepThreeSchema } from '@/lib/validations/planner.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Textarea } from '@/components/ui/Input';
import { StepForm } from '../../StepForm';

export function PlannerStepThree() {
  const { form, onNext, onBack } = useCategoryStepForm('planner', plannerStepThreeSchema, {
    budgetMin: '',
    budgetMax: '',
    notes: '',
  });
  const { register, formState: { errors } } = form;

  return (
    <StepForm title="Budget & notes" description="Optional, but helps planners respond better." onSubmit={onNext} onBack={onBack}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Minimum budget (₹)" htmlFor="budgetMin" error={errors.budgetMin?.message}>
          <Input id="budgetMin" type="number" inputMode="numeric" min={0} invalid={!!errors.budgetMin} {...register('budgetMin')} />
        </Field>
        <Field label="Maximum budget (₹)" htmlFor="budgetMax" error={errors.budgetMax?.message}>
          <Input id="budgetMax" type="number" inputMode="numeric" min={0} invalid={!!errors.budgetMax} {...register('budgetMax')} />
        </Field>
      </div>
      <Field label="Additional notes" htmlFor="notes" error={errors.notes?.message}>
        <Textarea id="notes" placeholder="Theme, preferences, anything vendors should know…" invalid={!!errors.notes} {...register('notes')} />
      </Field>
    </StepForm>
  );
}
