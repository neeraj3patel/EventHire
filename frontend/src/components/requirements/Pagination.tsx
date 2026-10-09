import Link from 'next/link';
import type { Category } from '@/lib/constants';
import { buttonStyles } from '@/components/ui/Button';

export function Pagination({ page, totalPages, category }: { page: number; totalPages: number; category?: Category }) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const q = new URLSearchParams();
    if (category) q.set('category', category);
    q.set('page', String(p));
    return `/requirements?${q}`;
  };

  return (
    <div className="flex items-center justify-between pt-6">
      {page > 1 ? (
        <Link href={href(page - 1)} className={buttonStyles('secondary')}>
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={href(page + 1)} className={buttonStyles('secondary')}>
          Next
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
