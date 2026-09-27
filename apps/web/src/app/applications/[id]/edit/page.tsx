'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Application } from '@job-tracker/shared';
import { api } from '@/lib/api';
import { getDictionary } from '@/lib/i18n';
import { useSession } from '@/lib/useSession';
import { AppHeader } from '@/components/AppHeader';
import { ApplicationForm } from '@/components/ApplicationForm';

// Edit mode: protected Client Component. It reads the id from the route and
// fetches the record on the client (that's where the token lives), then hands
// it to the form as initial data.
export default function EditApplicationPage() {
  const t = getDictionary();
  const user = useSession();
  const params = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    api
      .get(params.id)
      .then(setApplication)
      .catch(() => setError(true));
  }, [user, params.id]);

  if (!user) return null;

  return (
    <>
      <AppHeader user={user} />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">
          {t.form.editing}
        </h1>
        {error ? (
          <p className="text-sm text-red-600">{t.errors.load}</p>
        ) : application === null ? (
          <p className="text-gray-400">{t.common.loading}</p>
        ) : (
          <ApplicationForm initial={application} />
        )}
      </main>
    </>
  );
}
