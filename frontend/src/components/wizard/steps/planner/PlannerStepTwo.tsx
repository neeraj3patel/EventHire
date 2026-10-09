'use client';

import { Controller } from 'react-hook-form';
import { PLANNER_SERVICE_VALUES, PLANNING_STAGE_VALUES, toOptions } from '@/lib/constants';
import { plannerStepTwoSchema } from '@/lib/validations/planner.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Select } from '@/components/ui/Input';
import { CheckboxGroup } from '@/components/ui/Checkbox';
import { StepForm } from '../../StepForm';

const SERVICES = toOptions(PLANNER_SERVICE_VALUES);
const STAGES = toOptions(PLANNING_STAGE_VALUES);

export function PlannerStepTwo() {
  const { form, onNext, onBack } = useCategoryStepForm('planner', plannerStepTwoSchema, {
    services: [],
    guestCount: '',
  });
  const { register, control, formState: { errors } } = form;

  return (
    <StepForm title="Services & scope" description="What kind of planning help do you need?" onSubmit={onNext} onBack={onBack}>
      <Field label="Services needed" error={errors.services?.message} required>
        <Controller
          name="services"
          control={control}
          render={({ field }) => <CheckboxGroup options={SERVICES} value={field.value} onChange={field.onChange} />}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Planning stage" htmlFor="planningStage" error={errors.planningStage?.message} required>
          <Select id="planningStage" placeholder="Select stage" options={STAGES} invalid={!!errors.planningStage} {...register('planningStage')} />
        </Field>
        <Field label="Expected guests" htmlFor="guestCount" error={errors.guestCount?.message} required>
          <Input id="guestCount" type="number" inputMode="numeric" min={1} placeholder="e.g. 200" invalid={!!errors.guestCount} {...register('guestCount')} />
        </Field>
      </div>
    </StepForm>
  );
}
