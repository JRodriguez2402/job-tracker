import { es, type Dictionary } from '@/i18n/es';

// Only Spanish for now. Milestone 4 adds English (a second dictionary),
// locale routing, a switcher, and persistence. The shape is ready for it.
const dictionaries = { es } as const;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = 'es';

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
