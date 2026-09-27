'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@job-tracker/shared';
import { clearSession } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';

// Top bar for authenticated pages: shows the current user and a logout button.
export function AppHeader({ user }: { user: AuthUser }) {
  const t = getDictionary();
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace('/login');
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          {t.app.title}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{user.email}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-gray-300 px-3 py-1 font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {t.auth.logout}
          </button>
        </div>
      </div>
    </header>
  );
}
