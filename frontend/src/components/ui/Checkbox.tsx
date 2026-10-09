import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

/** Single boolean checkbox, works with react-hook-form `register`. */
export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, className, ...props }, ref) => (
    <label className={cn('flex cursor-pointer items-center gap-2.5 text-sm text-slate-700', className)}>
      <input ref={ref} type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-indigo-600" {...props} />
      {label}
    </label>
  ),
);
CheckboxField.displayName = 'CheckboxField';

interface CheckboxGroupProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
}

/** Multi-select rendered as toggle chips. */
export function CheckboxGroup<T extends string>({ options, value, onChange }: CheckboxGroupProps<T>) {
  const toggle = (v: T) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => {
        const active = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(o.value)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm transition',
              active
                ? 'border-indigo-600 bg-indigo-50 font-medium text-indigo-700'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
