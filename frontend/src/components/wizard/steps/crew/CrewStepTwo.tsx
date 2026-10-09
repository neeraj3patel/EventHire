'use client';

import { Controller } from 'react-hook-form';
import { CREW_ROLE_VALUES, EXPERIENCE_LEVEL_VALUES, label, toOptions, type CrewRole } from '@/lib/constants';
import { crewStepTwoSchema } from '@/lib/validations/crew.schema';
import { useCategoryStepForm } from '@/hooks/useCategoryStepForm';
import { Field } from '@/components/ui/Field';
import { Input, Select } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { StepForm } from '../../StepForm';

const LEVELS = toOptions(EXPERIENCE_LEVEL_VALUES);

interface RoleEntry {
  role: CrewRole;
  count: string;
}

function RolePicker({
  value,
  onChange,
  errors,
}: {
  value: RoleEntry[];
  onChange: (v: RoleEntry[]) => void;
  errors?: ({ count?: { message?: string } } | undefined)[];
}) {
  const find = (role: CrewRole) => value.findIndex((r) => r.role === role);

  const toggle = (role: CrewRole) => {
    const i = find(role);
    onChange(i >= 0 ? value.filter((r) => r.role !== role) : [...value, { role, count: '1' }]);
  };

  const setCount = (role: CrewRole, count: string) =>
    onChange(value.map((r) => (r.role === role ? { ...r, count } : r)));

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {CREW_ROLE_VALUES.map((role) => {
        const i = find(role);
        const selected = i >= 0;
        const countError = selected ? errors?.[i]?.count?.message : undefined;
        return (
          <div
            key={role}
            className={cn(
              'flex items-center justify-between gap-3 rounded-lg border px-3 py-2',
              selected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white',
            )}
          >
            <label className="flex flex-1 cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <input type="checkbox" checked={selected} onChange={() => toggle(role)} className="h-4 w-4 accent-indigo-600" />
              {label(role)}
            </label>
            {selected && (
              <div className="w-20">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  aria-label={`${label(role)} count`}
                  value={value[i].count}
                  invalid={!!countError}
                  onChange={(e) => setCount(role, e.target.value)}
                  className="py-1.5"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CrewStepTwo() {
  const { form, onNext, onBack } = useCategoryStepForm('crew', crewStepTwoSchema, { roles: [] });
  const { register, control, formState: { errors } } = form;

  return (
    <StepForm title="Crew needs" description="Pick the roles you need and how many people for each." onSubmit={onNext} onBack={onBack}>
      <Field label="Roles required" error={errors.roles?.message ?? errors.roles?.root?.message} required>
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <RolePicker
              value={field.value}
              onChange={field.onChange}
              errors={Array.isArray(errors.roles) ? errors.roles : undefined}
            />
          )}
        />
      </Field>
      <Field label="Experience level" htmlFor="experienceLevel" error={errors.experienceLevel?.message} required>
        <Select id="experienceLevel" placeholder="Select level" options={LEVELS} invalid={!!errors.experienceLevel} {...register('experienceLevel')} />
      </Field>
    </StepForm>
  );
}
