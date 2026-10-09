'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORY_META, CATEGORY_VALUES, EVENT_TYPE_VALUES, toOptions } from '@/lib/constants';
import { basicsSchema, type BasicsValues } from '@/lib/validations/basics.schema';
import { todayISO, cn } from '@/lib/utils';
import { useWizardStore } from '@/store/wizard.store';
import { Field } from '@/components/ui/Field';
import { Input, Select } from '@/components/ui/Input';
import { StepForm } from '../StepForm';

const EVENT_TYPE_OPTIONS = toOptions(EVENT_TYPE_VALUES);

export function BasicsStep() {
  const saved = useWizardStore((s) => s.basics);
  const setBasics = useWizardStore((s) => s.setBasics);
  const next = useWizardStore((s) => s.next);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicsValues, unknown, BasicsValues>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      eventName: '',
      dateType: 'single',
      startDate: '',
      endDate: '',
      location: '',
      venue: '',
      ...saved,
    },
  });

  const dateType = watch('dateType');

  const onSubmit = handleSubmit((values) => {
    setBasics(values);
    next();
  });

  return (
    <StepForm title="Event basics" description="Start with the essentials about your event." onSubmit={onSubmit}>
      <Field label="Event name" htmlFor="eventName" error={errors.eventName?.message} required>
        <Input id="eventName" placeholder="e.g. Annual Gala Night" invalid={!!errors.eventName} {...register('eventName')} />
      </Field>

      <Field label="Event type" htmlFor="eventType" error={errors.eventType?.message} required>
        <Select
          id="eventType"
          placeholder="Select event type"
          options={EVENT_TYPE_OPTIONS}
          invalid={!!errors.eventType}
          {...register('eventType')}
        />
      </Field>

      <Field label="Date" error={errors.startDate?.message ?? errors.endDate?.message} required>
        <div className="space-y-3">
          <div className="flex gap-4 text-sm text-slate-700">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="radio" value="single" className="accent-indigo-600" {...register('dateType')} /> Single day
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="radio" value="range" className="accent-indigo-600" {...register('dateType')} /> Date range
            </label>
          </div>
          <div className={cn('grid gap-3', dateType === 'range' && 'sm:grid-cols-2')}>
            <Input
              type="date"
              aria-label="Start date"
              min={todayISO()}
              invalid={!!errors.startDate}
              {...register('startDate')}
            />
            {dateType === 'range' && (
              <Input
                type="date"
                aria-label="End date"
                min={watch('startDate') || todayISO()}
                invalid={!!errors.endDate}
                {...register('endDate')}
              />
            )}
          </div>
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location" htmlFor="location" error={errors.location?.message} required>
          <Input id="location" placeholder="City" invalid={!!errors.location} {...register('location')} />
        </Field>
        <Field label="Venue (optional)" htmlFor="venue" error={errors.venue?.message}>
          <Input id="venue" placeholder="Venue name" invalid={!!errors.venue} {...register('venue')} />
        </Field>
      </div>

      <Field label="What are you looking for?" error={errors.category?.message} required>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div role="radiogroup" className="grid gap-3 sm:grid-cols-3">
              {CATEGORY_VALUES.map((c) => {
                const meta = CATEGORY_META[c];
                const Icon = meta.icon;
                const active = field.value === c;
                return (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => field.onChange(c)}
                    className={cn(
                      'rounded-xl border p-4 text-left transition',
                      active ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600/20' : 'border-slate-300 bg-white hover:border-slate-400',
                    )}
                  >
                    <Icon className={cn('mb-2 h-5 w-5', active ? 'text-indigo-600' : 'text-slate-500')} aria-hidden />
                    <div className="text-sm font-semibold text-slate-900">{meta.label}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{meta.description}</div>
                  </button>
                );
              })}
            </div>
          )}
        />
      </Field>
    </StepForm>
  );
}
