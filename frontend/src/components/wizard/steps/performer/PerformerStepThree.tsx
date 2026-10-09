'use client';

import { performerStepThreeSchema } from '@/lib/validations/performer.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Textarea } from '@/components/ui/Input';
import { CheckboxField } from '@/components/ui/Checkbox';
import { StepForm } from '../../StepForm';

export function PerformerStepThree() {
  const { form, onNext, onBack } = useCategoryStepForm('performer', performerStepThreeSchema, {
    durationMinutes: '',
    budgetPerPerformer: '',
    equipmentProvided: false,
    languages: '',
    notes: '',
  });
  const { register, formState: { errors } } = form;

  return (
    <StepForm title="Budget & logistics" description="Set expectations for the performance." onSubmit={onNext} onBack={onBack}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Performance duration (minutes)" htmlFor="durationMinutes" error={errors.durationMinutes?.message} required>
          <Input id="durationMinutes" type="number" inputMode="numeric" min={5} placeholder="e.g. 60" invalid={!!errors.durationMinutes} {...register('durationMinutes')} />
        </Field>
        <Field label="Budget per performer (₹)" htmlFor="budgetPerPerformer" error={errors.budgetPerPerformer?.message} required>
          <Input id="budgetPerPerformer" type="number" inputMode="numeric" min={0} invalid={!!errors.budgetPerPerformer} {...register('budgetPerPerformer')} />
        </Field>
      </div>
      <Field label="Languages" htmlFor="languages" error={errors.languages?.message} hint="Separate with commas, e.g. Hindi, English">
        <Input id="languages" invalid={!!errors.languages} {...register('languages')} />
      </Field>
      <CheckboxField label="Sound & equipment will be provided by the host" {...register('equipmentProvided')} />
      <Field label="Additional notes" htmlFor="notes" error={errors.notes?.message}>
        <Textarea id="notes" invalid={!!errors.notes} {...register('notes')} />
      </Field>
    </StepForm>
  );
}
