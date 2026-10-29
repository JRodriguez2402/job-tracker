import type {
  Application,
  AuthCredentials,
  AuthResponse,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@job-tracker/shared';
import { clearSession, getToken } from './auth';

// Base URL of the NestJS API. NEXT_PUBLIC_ is required so the value is also
// available in the browser (Client Components), not just on the server.
const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// Thrown on any non-2xx response so callers can react to the status code.
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api${path}`, {
    cache: 'no-store',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // Attach the JWT when we have one; auth endpoints work without it.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (res.status === 401) {
    clearSession(); // token missing, expired, or invalid
    throw new ApiError(401, 'Unauthorized');
  }
  if (!res.ok) {
    throw new ApiError(res.status, `API request failed: ${res.status}`);
  }

  // 204 No Content (e.g. DELETE) has no body to parse.
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

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

  register: (credentials: AuthCredentials) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  login: (credentials: AuthCredentials) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};
