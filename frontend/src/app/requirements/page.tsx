import type { Metadata } from 'next';
import { CATEGORY_VALUES } from '@/lib/constants';
import { listRequirements } from '@/lib/api/requirements';
import { ApiClientError } from '@/lib/api/client';
import { Alert } from '@/components/ui/Alert';
import { CategoryTabs } from '@/components/requirements/CategoryTabs';
import { RequirementCard } from '@/components/requirements/RequirementCard';
import { Pagination } from '@/components/requirements/Pagination';

export const metadata: Metadata = { title: 'Requirements' };

type SearchParams = Promise<{ category?: string; page?: string }>;

export default async function RequirementsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = CATEGORY_VALUES.find((c) => c === params.category);
  const page = Math.max(1, Number(params.page) || 1);

  let result: Awaited<ReturnType<typeof listRequirements>> | null = null;
  let errorMessage: string | null = null;
  try {
    result = await listRequirements({ category, page, limit: 9 });
  } catch (e) {
    errorMessage = e instanceof ApiClientError ? e.message : 'Could not load requirements.';
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Requirements</h1>
        <p className="mt-1 text-slate-600">Everything posted so far, grouped by category.</p>
      </div>

      <CategoryTabs active={category} />

      {errorMessage && <Alert>{errorMessage}</Alert>}

      {result && result.items.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
          No requirements found{category ? ' in this category' : ''} yet.
        </p>
      )}

      {result && result.items.length > 0 && (
        <>
          <p className="text-sm text-slate-500">{result.pagination.total} total</p>
          <div className="grid gap-4 md:grid-cols-2">
            {result.items.map((item) => (
              <RequirementCard key={item._id} item={item} />
            ))}
          </div>
          <Pagination page={result.pagination.page} totalPages={result.pagination.totalPages} category={category} />
        </>
      )}
    </div>
  );
}
