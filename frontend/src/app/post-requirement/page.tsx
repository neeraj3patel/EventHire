import type { Metadata } from 'next';
import { WizardShell } from '@/components/wizard/WizardShell';

export const metadata: Metadata = { title: 'Post a requirement' };

export default function PostRequirementPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post a requirement</h1>
        <p className="mt-1 text-slate-600">Tell us about your event and who you need.</p>
      </div>
      <WizardShell />
    </div>
  );
}
