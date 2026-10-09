'use client';

import { crewStepThreeSchema } from '@/lib/validations/crew.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Textarea } from '@/components/ui/Input';
import { CheckboxField } from '@/components/ui/Checkbox';
import { StepForm } from '../../StepForm';

export function CrewStepThree() {
  const { form, onNext, onBack } = useCategoryStepForm('crew', crewStepThreeSchema, {
    shiftHours: '',
    numberOfDays: '',
    budgetPerDay: '',
    accommodationProvided: false,
    transportProvided: false,
    notes: '',
  });
  const { register, formState: { errors } } = form;

  return (
    <StepForm title="Shifts & budget" description="Work hours, duration and perks for the crew." onSubmit={onNext} onBack={onBack}>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Shift length (hours/day)" htmlFor="shiftHours" error={errors.shiftHours?.message} required>
          <Input id="shiftHours" type="number" inputMode="decimal" min={1} max={24} invalid={!!errors.shiftHours} {...register('shiftHours')} />
        </Field>
        <Field label="Number of days" htmlFor="numberOfDays" error={errors.numberOfDays?.message} required>
          <Input id="numberOfDays" type="number" inputMode="numeric" min={1} invalid={!!errors.numberOfDays} {...register('numberOfDays')} />
        </Field>
        <Field label="Budget per day (₹)" htmlFor="budgetPerDay" error={errors.budgetPerDay?.message} required>
          <Input id="budgetPerDay" type="number" inputMode="numeric" min={0} invalid={!!errors.budgetPerDay} {...register('budgetPerDay')} />
        </Field>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <CheckboxField label="Accommodation provided" {...register('accommodationProvided')} />
        <CheckboxField label="Transport provided" {...register('transportProvided')} />
      </div>
      <Field label="Additional notes" htmlFor="notes" error={errors.notes?.message}>
        <Textarea id="notes" invalid={!!errors.notes} {...register('notes')} />
      </Field>
    </StepForm>
  );
}
