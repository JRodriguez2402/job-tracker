import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@job-tracker/shared';

// Base URL of the NestJS API. NEXT_PUBLIC_ is required so the value is also
// available in the browser (Client Components), not just on the server.
const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    cache: 'no-store', // always fetch fresh data (also the Next 16 default)
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  // 204 No Content (e.g. DELETE) has no body to parse.
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

// Small typed wrapper so components never hand-write fetch calls or URLs.
export const api = {
  list: () => request<Application[]>('/applications'),
  get: (id: string) => request<Application>(`/applications/${id}`),
  create: (input: CreateApplicationInput) =>
    request<Application>('/applications', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  update: (id: string, input: UpdateApplicationInput) =>
    request<Application>(`/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),
  remove: (id: string) =>
    request<void>(`/applications/${id}`, { method: 'DELETE' }),
};
