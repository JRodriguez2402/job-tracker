'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ApplicationStage,
  APPLICATION_STAGES,
  type Application,
  type CreateApplicationInput,
} from '@job-tracker/shared';
import { api } from '@/lib/api';
import { getDictionary } from '@/lib/i18n';

type Props = {
  // When provided, the form edits this application; otherwise it creates one.
  initial?: Application;
};

const inputClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900';
const labelClass = 'mb-1 block text-sm font-medium';

export function ApplicationForm({ initial }: Props) {
  const t = getDictionary();
  const router = useRouter();

  const [company, setCompany] = useState(initial?.company ?? '');
  const [role, setRole] = useState(initial?.role ?? '');
  const [url, setUrl] = useState(initial?.url ?? '');
  const [salary, setSalary] = useState(initial?.salary ?? '');
  const [stack, setStack] = useState((initial?.stack ?? []).join(', '));
  const [appliedDate, setAppliedDate] = useState(initial?.appliedDate ?? '');
  const [stage, setStage] = useState<ApplicationStage>(
    initial?.stage ?? ApplicationStage.Saved,
  );
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    // Shape the form fields into the API payload: trim text, turn empty
    // strings into null, and split the comma-separated stack into an array.
    const payload: CreateApplicationInput = {
      company: company.trim(),
      role: role.trim(),
      url: url.trim() || null,
      salary: salary.trim() || null,
      stack: stack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      appliedDate: appliedDate || null,
      stage,
      notes: notes.trim() || null,
    };

    try {
      if (initial) {
        await api.update(initial.id, payload);
      } else {
        await api.create(payload);
      }
      // Go back to the list and re-run its Server Component to show the change.
      router.push('/');
      router.refresh();
    } catch {
      setError(t.errors.save);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t.form.company}</label>
          <input
            className={inputClass}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{t.form.role}</label>
          <input
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.form.stage}</label>
        <select
          className={inputClass}
          value={stage}
          onChange={(e) => setStage(e.target.value as ApplicationStage)}
        >
          {APPLICATION_STAGES.map((value) => (
            <option key={value} value={value}>
              {t.stage[value]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t.form.url}</label>
        <input
          className={inputClass}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t.form.salary}</label>
          <input
            className={inputClass}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>{t.form.appliedDate}</label>
          <input
            className={inputClass}
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.form.stack}</label>
        <input
          className={inputClass}
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="React, TypeScript, NestJS"
        />
      </div>

      <div>
        <label className={labelClass}>{t.form.notes}</label>
        <textarea
          className={inputClass}
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? '…' : t.form.save}
        </button>
        <Link
          href="/"
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:underline dark:text-gray-300"
        >
          {t.form.cancel}
        </Link>
      </div>
    </form>
  );
}
