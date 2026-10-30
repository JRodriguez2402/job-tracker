'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  dictionaries,
  defaultLocale,
  type Dictionary,
  type Locale,
} from './i18n';

const LOCALE_KEY = 'jt_locale';

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    return saved === 'en' || saved === 'es' ? saved : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start from the default so server and first client render match (no hydration
  // mismatch); the stored choice is applied right after, on mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored;
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {
      // Ignore storage failures.
    }
  }

  return (
    <LocaleContext.Provider
      value={{ locale, dict: dictionaries[locale], setLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

// Convenience hook for components that only need the active dictionary.
export function useDictionary(): Dictionary {
  return useLocale().dict;
}
