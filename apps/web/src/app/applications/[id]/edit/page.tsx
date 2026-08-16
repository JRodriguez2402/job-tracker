import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import { api } from '@/lib/api';
import { ApplicationForm } from '@/components/ApplicationForm';

// Edit mode. In Next 16 `params` is a Promise, so we await it (see the v16
// upgrade guide). It's a Server Component, so it fetches the record on the
// server and hands it to the form as initial data.
export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getDictionary();

  const application = await api.get(id).catch(() => null);
  if (!application) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.form.editing}</h1>
      <ApplicationForm initial={application} />
    </main>
  );
}
