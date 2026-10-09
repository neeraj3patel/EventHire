'use client';

import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-4 py-16 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-slate-500">We could not load the requirements.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
