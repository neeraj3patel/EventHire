import Link from 'next/link';
import { CATEGORY_META, CATEGORY_VALUES, type Category } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function CategoryTabs({ active }: { active?: Category }) {
  const tabs = [
    { href: '/requirements', text: 'All', isActive: !active },
    ...CATEGORY_VALUES.map((c) => ({
      href: `/requirements?category=${c}`,
      text: CATEGORY_META[c].label,
      isActive: active === c,
    })),
  ];

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filter by category">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.isActive ? 'page' : undefined}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm transition',
            t.isActive ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50',
          )}
        >
          {t.text}
        </Link>
      ))}
    </nav>
  );
}
