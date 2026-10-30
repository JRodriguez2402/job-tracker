'use client';

import { useState } from 'react';
import { useDictionary } from '@/lib/LocaleProvider';

// Copies the owner's read-only share link to the clipboard.
export function ShareButton({ userId }: { userId: string }) {
  const t = useDictionary();
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/share/${userId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('', url); // fallback if clipboard is unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {copied ? t.share.copied : t.share.button}
    </button>
  );
}
