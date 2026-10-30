'use client';

import { locales, type Locale } from '@/lib/i18n';
import { useLocale } from '@/lib/LocaleProvider';

const labels: Record<Locale, string> = { es: 'ES', en: 'EN' };

// A compact ES/EN toggle. The choice persists across reloads.
export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-gray-300 p-0.5 text-xs dark:border-gray-700">
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded px-2 py-0.5 font-medium transition ${
            locale === option
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
