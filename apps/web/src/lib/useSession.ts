'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@job-tracker/shared';
import { getStoredUser, getToken } from './auth';

// Guards a page: if there is no token, redirect to /login. Returns the current
// user once known (null while loading or redirecting).
export function useSession(): AuthUser | null {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    setUser(getStoredUser());
  }, [router]);

  return user;
}
