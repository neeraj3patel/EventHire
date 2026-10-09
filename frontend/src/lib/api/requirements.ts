import { apiFetch } from './client';
import type { Category } from '@/lib/constants';
import type {
  ApiList, ApiSuccess, CreateRequirementPayload, Pagination, Requirement,
} from '@/types/requirement';

export async function createRequirement(payload: CreateRequirementPayload): Promise<Requirement> {
  const res = await apiFetch<ApiSuccess<Requirement>>('/requirements', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function listRequirements(params: {
  category?: Category;
  page?: number;
  limit?: number;
}): Promise<{ items: Requirement[]; pagination: Pagination }> {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  query.set('page', String(params.page ?? 1));
  query.set('limit', String(params.limit ?? 9));

  const res = await apiFetch<ApiList<Requirement>>(`/requirements?${query}`, { cache: 'no-store' });
  return { items: res.data, pagination: res.meta };
}
