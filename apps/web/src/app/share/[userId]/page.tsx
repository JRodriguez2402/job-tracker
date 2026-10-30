'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ApplicationStage, type Application } from '@job-tracker/shared';
import { api } from '@/lib/api';
import { useDictionary } from '@/lib/LocaleProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { FunnelStats } from '@/components/FunnelStats';

const STAGE_COLORS: Record<ApplicationStage, string> = {
  [ApplicationStage.Saved]: 'bg-gray-100 text-gray-700',
  [ApplicationStage.Applied]: 'bg-blue-100 text-blue-700',
  [ApplicationStage.Screening]: 'bg-amber-100 text-amber-700',
  [ApplicationStage.Technical]: 'bg-purple-100 text-purple-700',
  [ApplicationStage.Offer]: 'bg-emerald-100 text-emerald-700',
  [ApplicationStage.Rejected]: 'bg-rose-100 text-rose-700',
};

// Public, read-only page. No session: anyone with the link can view the owner's
// applications, but there are no edit/delete/create actions.
export default function SharePage() {
  const t = useDictionary();
  const params = useParams<{ userId: string }>();
  const [items, setItems] = useState<Application[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .shared(params.userId)
      .then(setItems)
      .catch(() => setError(true));
  }, [params.userId]);

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <span className="font-semibold">{t.app.title}</span>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {t.share.readOnly}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:border-rose-900 dark:bg-rose-950/40">
            {t.errors.load}
          </p>
        ) : items === null ? (
          <p className="p-10 text-center text-gray-400">{t.common.loading}</p>
        ) : items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700">
            {t.list.empty}
          </p>
        ) : (
          <>
            <FunnelStats applications={items} />
            <ul className="flex flex-col gap-3">
              {items.map((application) => (
                <li
                  key={application.id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">
                      {application.company}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[application.stage]}`}
                    >
                      {t.stage[application.stage]}
                    </span>
                  </div>
                  <p className="truncate text-sm text-gray-500">
                    {application.role}
                  </p>
                  {application.appliedDate && (
                    <p className="mt-1 text-xs text-gray-400">
                      {application.appliedDate}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
