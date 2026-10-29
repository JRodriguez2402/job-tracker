'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { setSession } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';

const inputClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900';

export default function RegisterPage() {
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
      const res = await api.register({ email: email.trim(), password });
      setSession(res.accessToken, res.user);
      router.replace('/');
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 409
          ? t.auth.emailTaken
          : t.auth.registerError,
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">
        {t.auth.registerTitle}
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
            minLength={8}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-400">{t.auth.passwordHint}</p>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? '…' : t.auth.registerSubmit}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        {t.auth.haveAccount}{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          {t.auth.loginLink}
        </Link>
      </p>
    </main>
  );
}
