'use client';

import { useForm, type DefaultValues, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { Category } from '@/lib/constants';
import { useWizardStore } from '@/store/wizard.store';

/**
 * Shared logic for wizard steps 2 and 3: form + zod validation, prefilled from the store,
 * saves on "Continue" (validated) and on "Back" (as-is).
 */
export function useCategoryStepForm<T extends FieldValues>(
  category: Category,
  schema: z.ZodType<T, z.ZodTypeDef, T>,
  defaults: DefaultValues<T>,
) {
  const saved = useWizardStore((s) => s.data[category]);
  const saveCategoryData = useWizardStore((s) => s.saveCategoryData);
  const next = useWizardStore((s) => s.next);
  const back = useWizardStore((s) => s.back);

  // Only restore keys that belong to this step
  const initial: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (saved[key] !== undefined) initial[key] = saved[key];
  }

  const form = useForm<T, unknown, T>({
    resolver: zodResolver(schema),
    defaultValues: initial as DefaultValues<T>,
  });

  const onNext = form.handleSubmit((values) => {
    saveCategoryData(category, values);
    next();
  });

  const onBack = () => {
    saveCategoryData(category, form.getValues());
    back();
  };

  return { form, onNext, onBack };
}
