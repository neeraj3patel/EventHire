import { API_URL } from '@/config/env';

export interface FieldError {
  field: string;
  message: string;
}

export class ApiClientError extends Error {
  status: number;
  fieldErrors: FieldError[];

  constructor(message: string, status: number, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
    });
  } catch {
    throw new ApiClientError('Cannot reach the server. Please check your connection and try again.', 0);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiClientError(
      body?.message ?? 'Something went wrong. Please try again.',
      response.status,
      body?.errors ?? [],
    );
  }
  return body as T;
}
