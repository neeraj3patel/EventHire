import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TOTAL_STEPS, type Category } from '@/lib/constants';
import type { BasicsValues } from '@/lib/validations/basics.schema';
import type { CategoryData } from '@/lib/payload';

interface WizardState {
  step: number;
  basics: BasicsValues | null;
  /** Per-category step 2 + 3 values, kept separately so switching category never loses data. */
  data: CategoryData;
  setBasics: (values: BasicsValues) => void;
  saveCategoryData: (category: Category, values: Record<string, unknown>) => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

const emptyData = (): CategoryData => ({ planner: {}, performer: {}, crew: {} });

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      step: 1,
      basics: null,
      data: emptyData(),
      setBasics: (basics) => set({ basics }),
      saveCategoryData: (category, values) =>
        set((s) => ({ data: { ...s.data, [category]: { ...s.data[category], ...values } } })),
      goTo: (step) => set({ step: Math.min(Math.max(step, 1), TOTAL_STEPS) }),
      next: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS) })),
      back: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      reset: () => set({ step: 1, basics: null, data: emptyData() }),
    }),
    {
      name: 'gopratle-requirement-wizard',
      storage: createJSONStorage(() => sessionStorage), // survives refresh, cleared when tab closes
    },
  ),
);
