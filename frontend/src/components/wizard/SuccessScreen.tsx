import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORY_META } from '@/lib/constants';
import type { Requirement } from '@/types/requirement';
import { Button, buttonStyles } from '@/components/ui/Button';

export function SuccessScreen({ requirement, onCreateAnother }: { requirement: Requirement; onCreateAnother: () => void }) {
  return (
    <div className="space-y-4 py-6 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden />
      <h2 className="text-2xl font-semibold text-slate-900">Requirement posted!</h2>
      <p className="text-slate-600">
        <strong>{requirement.eventName}</strong> was saved under{' '}
        <strong>{CATEGORY_META[requirement.category].label}</strong>.
      </p>
      <p className="text-xs text-slate-400">Reference: {requirement._id}</p>
      <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
        <Link href={`/requirements?category=${requirement.category}`} className={buttonStyles('primary')}>
          View {CATEGORY_META[requirement.category].label} requirements
        </Link>
        <Button variant="secondary" onClick={onCreateAnother}>
          Post another
        </Button>
      </div>
    </div>
  );
}
