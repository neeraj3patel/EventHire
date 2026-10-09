'use client';

import { useState } from 'react';
import { STEP_LABELS, type Category } from '@/lib/constants';
import { useHydrated } from '@/hooks/useHydrated';
import { useWizardStore } from '@/store/wizard.store';
import type { Requirement } from '@/types/requirement';
import { Stepper } from './Stepper';
import { SuccessScreen } from './SuccessScreen';
import { BasicsStep } from './steps/BasicsStep';
import { ReviewStep } from './steps/ReviewStep';
import { PlannerStepTwo } from './steps/planner/PlannerStepTwo';
import { PlannerStepThree } from './steps/planner/PlannerStepThree';
import { PerformerStepTwo } from './steps/performer/PerformerStepTwo';
import { PerformerStepThree } from './steps/performer/PerformerStepThree';
import { CrewStepTwo } from './steps/crew/CrewStepTwo';
import { CrewStepThree } from './steps/crew/CrewStepThree';

const CATEGORY_STEPS: Record<Category, [React.ComponentType, React.ComponentType]> = {
  planner: [PlannerStepTwo, PlannerStepThree],
  performer: [PerformerStepTwo, PerformerStepThree],
  crew: [CrewStepTwo, CrewStepThree],
};

export function WizardShell() {
  const hydrated = useHydrated();
  const step = useWizardStore((s) => s.step);
  const category = useWizardStore((s) => s.basics?.category);
  const [created, setCreated] = useState<Requirement | null>(null);

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" aria-hidden />;
  }

  if (created) {
    return (
      <Card>
        <SuccessScreen requirement={created} onCreateAnother={() => setCreated(null)} />
      </Card>
    );
  }

  // Steps 2-4 make no sense without a category from step 1
  const activeStep = step > 1 && !category ? 1 : step;
  const labels = category
    ? ['Event basics', ...STEP_LABELS[category], 'Review & submit']
    : ['Event basics', 'Details', 'Details', 'Review & submit'];
  const [StepTwo, StepThree] = category ? CATEGORY_STEPS[category] : [null, null];

  return (
    <div className="space-y-8">
      <Stepper current={activeStep} labels={labels} />
      <Card>
        {activeStep === 1 && <BasicsStep />}
        {activeStep === 2 && StepTwo && <StepTwo />}
        {activeStep === 3 && StepThree && <StepThree />}
        {activeStep === 4 && <ReviewStep onSubmitted={setCreated} />}
      </Card>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">{children}</div>;
}
