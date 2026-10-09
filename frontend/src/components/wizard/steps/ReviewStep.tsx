'use client';

import { useMemo, useState } from 'react';
import { CATEGORY_META } from '@/lib/constants';
import { buildPayload } from '@/lib/payload';
import { describeBasics, describeDetails, type Row } from '@/lib/format';
import { createRequirement } from '@/lib/api/requirements';
import { ApiClientError } from '@/lib/api/client';
import { useWizardStore } from '@/store/wizard.store';
import type { Requirement } from '@/types/requirement';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

function Section({ title, rows, onEdit }: { title: string; rows: Row[]; onEdit: () => void }) {
  return (
    <section className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-indigo-600 hover:underline">
          Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-1 px-4 py-2.5 text-sm sm:grid-cols-3">
            <dt className="text-slate-500">{r.label}</dt>
            <dd className="text-slate-900 sm:col-span-2">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ReviewStep({ onSubmitted }: { onSubmitted: (r: Requirement) => void }) {
  const basics = useWizardStore((s) => s.basics);
  const data = useWizardStore((s) => s.data);
  const goTo = useWizardStore((s) => s.goTo);
  const back = useWizardStore((s) => s.back);
  const reset = useWizardStore((s) => s.reset);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ApiClientError | null>(null);

  const payload = useMemo(() => (basics ? buildPayload(basics, data) : null), [basics, data]);

  if (!payload) {
    return (
      <div className="space-y-4">
        <Alert>Some details are missing. Please go back and complete the earlier steps.</Alert>
        <Button variant="secondary" onClick={() => goTo(1)}>
          Back to step 1
        </Button>
      </div>
    );
  }

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const created = await createRequirement(payload);
      reset();
      onSubmitted(created);
    } catch (e) {
      setError(e instanceof ApiClientError ? e : new ApiClientError('Unexpected error. Please try again.', 0));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Review & submit</h2>
        <p className="mt-1 text-sm text-slate-500">
          Posting as <strong>{CATEGORY_META[payload.category].label}</strong>. Check everything before you submit.
        </p>
      </div>

      <Section title="Event basics" rows={describeBasics(payload)} onEdit={() => goTo(1)} />
      <Section title={`${CATEGORY_META[payload.category].label} details`} rows={describeDetails(payload)} onEdit={() => goTo(2)} />

      {error && (
        <Alert>
          <p className="font-medium">{error.message}</p>
          {error.fieldErrors.length > 0 && (
            <ul className="mt-1 list-disc pl-5">
              {error.fieldErrors.map((f) => (
                <li key={`${f.field}-${f.message}`}>
                  {f.field}: {f.message}
                </li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <Button type="button" variant="secondary" onClick={back} disabled={submitting}>
          Back
        </Button>
        <Button type="button" onClick={submit} loading={submitting}>
          Submit requirement
        </Button>
      </div>
    </div>
  );
}
