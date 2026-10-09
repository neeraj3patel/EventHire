import { label } from '@/lib/constants';
import { describeDetails, formatDate, formatDates } from '@/lib/format';
import type { Requirement } from '@/types/requirement';
import { CategoryBadge } from '@/components/ui/Badge';

export function RequirementCard({ item }: { item: Requirement }) {
  const rows = describeDetails(item);
  const place = [item.venue, item.location].filter(Boolean).join(', ');

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{item.eventName}</h3>
        <CategoryBadge category={item.category} />
      </div>
      <p className="text-sm text-slate-500">
        {label(item.eventType)} · {formatDates(item.dateType, item.startDate, item.endDate)} · {place}
      </p>
      <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-2">
            <dt className="w-32 shrink-0 text-slate-500">{r.label}</dt>
            <dd className="text-slate-800">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-4 text-xs text-slate-400">Posted {formatDate(item.createdAt)}</p>
    </article>
  );
}
