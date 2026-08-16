import Link from 'next/link';
import { ApplicationStage } from '@job-tracker/shared';
import { api } from '@/lib/api';
import { getDictionary } from '@/lib/i18n';
import { DeleteButton } from '@/components/DeleteButton';

// Tailwind classes for each stage badge.
const STAGE_COLORS: Record<ApplicationStage, string> = {
  [ApplicationStage.Saved]: 'bg-gray-100 text-gray-700',
  [ApplicationStage.Applied]: 'bg-blue-100 text-blue-700',
  [ApplicationStage.Screening]: 'bg-amber-100 text-amber-700',
  [ApplicationStage.Technical]: 'bg-purple-100 text-purple-700',
  [ApplicationStage.Offer]: 'bg-emerald-100 text-emerald-700',
  [ApplicationStage.Rejected]: 'bg-rose-100 text-rose-700',
};

// Server Component: it runs on the server, so it can fetch from the API
// directly and ships zero JavaScript for the list rendering itself.
export default async function HomePage() {
  const t = getDictionary();
  const applications = await api.list();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.app.title}</h1>
          <p className="text-sm text-gray-500">{t.app.subtitle}</p>
        </div>
        <Link
          href="/applications/new"
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {t.list.new}
        </Link>
      </header>

      {applications.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
          {t.list.empty}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {applications.map((application) => (
            <li
              key={application.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="min-w-0">
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
              </div>

              <div className="flex shrink-0 items-center gap-3 text-sm">
                <Link
                  href={`/applications/${application.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  {t.list.edit}
                </Link>
                <DeleteButton
                  id={application.id}
                  label={t.list.delete}
                  confirmText={t.list.confirmDelete}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
