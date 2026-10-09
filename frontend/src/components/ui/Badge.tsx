import { CATEGORY_META, type Category } from '@/lib/constants';
import { cn } from '@/lib/utils';

const COLORS: Record<Category, string> = {
  planner: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  performer: 'bg-pink-50 text-pink-700 ring-pink-200',
  crew: 'bg-amber-50 text-amber-700 ring-amber-200',
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', COLORS[category])}>
      {CATEGORY_META[category].label}
    </span>
  );
}
