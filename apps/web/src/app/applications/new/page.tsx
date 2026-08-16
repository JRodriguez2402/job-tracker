import { getDictionary } from '@/lib/i18n';
import { ApplicationForm } from '@/components/ApplicationForm';

// Create mode: renders the form with no initial data.
export default function NewApplicationPage() {
  const t = getDictionary();
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.form.creating}</h1>
      <ApplicationForm />
    </main>
  );
}
