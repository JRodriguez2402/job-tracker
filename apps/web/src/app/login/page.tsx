'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { setSession } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';

const inputClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900';

export default function LoginPage() {
  const t = getDictionary();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.login({ email: email.trim(), password });
      setSession(res.accessToken, res.user);
      router.replace('/');
    } catch {
      setError(t.auth.invalidCredentials);
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">
        {t.auth.loginTitle}
      </h1>
      <p className="mb-6 text-sm text-gray-500">{t.app.title}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">{t.auth.email}</label>
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t.auth.password}
          </label>
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? '…' : t.auth.loginSubmit}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        {t.auth.noAccount}{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          {t.auth.registerLink}
        </Link>
      </p>
    </main>
  );
}
