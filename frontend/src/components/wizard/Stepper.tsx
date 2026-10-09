import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Stepper({ current, labels }: { current: number; labels: string[] }) {
  return (
    <ol className="flex items-start" aria-label="Progress">
      {labels.map((text, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={text} className="flex flex-1 flex-col items-center gap-2 text-center" aria-current={active ? 'step' : undefined}>
            <div className="flex w-full items-center">
              <div className={cn('h-0.5 flex-1', i === 0 ? 'bg-transparent' : done || active ? 'bg-indigo-600' : 'bg-slate-200')} />
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                  done && 'bg-indigo-600 text-white',
                  active && 'bg-indigo-600 text-white ring-4 ring-indigo-100',
                  !done && !active && 'bg-slate-200 text-slate-500',
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden /> : step}
              </div>
              <div
                className={cn(
                  'h-0.5 flex-1',
                  i === labels.length - 1 ? 'bg-transparent' : done ? 'bg-indigo-600' : 'bg-slate-200',
                )}
              />
            </div>
            <span className={cn('hidden text-xs sm:block', active ? 'font-medium text-slate-900' : 'text-slate-500')}>{text}</span>
          </li>
        );
      })}
    </ol>
  );
}
