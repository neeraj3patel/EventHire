'use client';

import { PERFORMER_TYPE_VALUES, toOptions } from '@/lib/constants';
import { performerStepTwoSchema } from '@/lib/validations/performer.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Select } from '@/components/ui/Input';
import { StepForm } from '../../StepForm';

const TYPES = toOptions(PERFORMER_TYPE_VALUES);

export function PerformerStepTwo() {
  const { form, onNext, onBack } = useCategoryStepForm('performer', performerStepTwoSchema, {
    genres: '',
    performersNeeded: '1',
  });
  const { register, formState: { errors } } = form;

  return (
    <StepForm title="Act details" description="Who do you want on stage?" onSubmit={onNext} onBack={onBack}>
      <Field label="Performer type" htmlFor="performerType" error={errors.performerType?.message} required>
        <Select id="performerType" placeholder="Select performer type" options={TYPES} invalid={!!errors.performerType} {...register('performerType')} />
      </Field>
      <Field label="Genres / style" htmlFor="genres" error={errors.genres?.message} hint="Separate with commas, e.g. Bollywood, Sufi, Retro">
        <Input id="genres" invalid={!!errors.genres} {...register('genres')} />
      </Field>
      <Field label="Number of performers" htmlFor="performersNeeded" error={errors.performersNeeded?.message} required>
        <Input id="performersNeeded" type="number" inputMode="numeric" min={1} invalid={!!errors.performersNeeded} {...register('performersNeeded')} />
      </Field>
    </StepForm>
  );
}
