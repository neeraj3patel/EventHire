import type { FormEventHandler, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface StepFormProps {
  title: string;
  description: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onBack?: () => void;
  submitLabel?: string;
  children: ReactNode;
}

export function StepForm({ title, description, onSubmit, onBack, submitLabel = 'Continue', children }: StepFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-5">{children}</div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        {onBack ? (
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
