import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

const controlStyles = (invalid?: boolean) =>
  cn(
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400',
    'focus:outline-none focus:ring-2 focus:ring-indigo-500/40',
    invalid ? 'border-red-500' : 'border-slate-300 focus:border-indigo-500',
  );

type WithInvalid<T> = T & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, WithInvalid<InputHTMLAttributes<HTMLInputElement>>>(
  ({ invalid, className, ...props }, ref) => (
    <input ref={ref} aria-invalid={invalid || undefined} className={cn(controlStyles(invalid), className)} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, WithInvalid<TextareaHTMLAttributes<HTMLTextAreaElement>>>(
  ({ invalid, className, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={4}
      aria-invalid={invalid || undefined}
      className={cn(controlStyles(invalid), className)}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

interface SelectProps extends WithInvalid<SelectHTMLAttributes<HTMLSelectElement>> {
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ invalid, className, options, placeholder, ...props }, ref) => (
    <select ref={ref} aria-invalid={invalid || undefined} className={cn(controlStyles(invalid), className)} {...props}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
);
Select.displayName = 'Select';
