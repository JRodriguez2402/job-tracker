'use client';

import {
  APPLICATION_STAGES,
  ApplicationStage,
  type Application,
} from '@job-tracker/shared';
import { useDictionary } from '@/lib/LocaleProvider';

const STAGE_ACCENT: Record<ApplicationStage, string> = {
  [ApplicationStage.Saved]: 'bg-gray-400',
  [ApplicationStage.Applied]: 'bg-blue-500',
  [ApplicationStage.Screening]: 'bg-amber-500',
  [ApplicationStage.Technical]: 'bg-purple-500',
  [ApplicationStage.Offer]: 'bg-emerald-500',
  [ApplicationStage.Rejected]: 'bg-rose-500',
};

// A compact funnel overview: how many applications sit in each stage.
export function FunnelStats({ applications }: { applications: Application[] }) {
  const t = useDictionary();

  const counts = APPLICATION_STAGES.reduce(
    (acc, stage) => ({ ...acc, [stage]: 0 }),
    {} as Record<ApplicationStage, number>,
  );
  for (const application of applications) {
    counts[application.stage] += 1;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm font-medium text-gray-500">
        {t.dashboard.title} · {applications.length} {t.dashboard.total}
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {APPLICATION_STAGES.map((stage) => (
          <div
            key={stage}
            className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${STAGE_ACCENT[stage]}`} />
              <span className="truncate text-xs text-gray-500">
                {t.stage[stage]}
              </span>
            </div>
            <div className="mt-1 text-2xl font-bold tabular-nums">
              {counts[stage]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
