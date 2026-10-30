'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@job-tracker/shared';
import { clearSession } from '@/lib/auth';
import { useDictionary } from '@/lib/LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

// Top bar for authenticated pages: title, language switch, user and logout.
export function AppHeader({ user }: { user: AuthUser }) {
  const t = useDictionary();
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace('/login');
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-semibold">
          {t.app.title}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <LanguageSwitcher />
          <span className="hidden text-gray-500 sm:inline">{user.email}</span>
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
