import { es, type Dictionary } from '@/i18n/es';
import { en } from '@/i18n/en';

export type { Dictionary };

export const dictionaries = { es, en };
export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
