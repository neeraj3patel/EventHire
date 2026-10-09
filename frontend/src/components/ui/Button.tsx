import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

export const buttonStyles = (variant: Variant = 'primary', className?: string) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-500',
    variant === 'secondary' && 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    variant === 'ghost' && 'text-slate-600 hover:bg-slate-100',
    className,
  );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading, disabled, className, children, ...props }, ref) => (
    <button ref={ref} disabled={disabled || loading} className={buttonStyles(variant, className)} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
