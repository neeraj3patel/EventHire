import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Alert({ variant = 'error', children }: { variant?: 'error' | 'info'; children: ReactNode }) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-lg border px-4 py-3 text-sm',
        variant === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-indigo-200 bg-indigo-50 text-indigo-800',
      )}
    >
      {children}
    </div>
  );
}
