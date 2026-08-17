'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

type Props = {
  id: string;
  label: string;
  confirmText: string;
};

// Client Component: needs an onClick handler and local state, so it lives on
// the client. The list itself stays a Server Component.
export function DeleteButton({ id, label, confirmText }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmText)) return;
    setDeleting(true);
    try {
      await api.remove(id);
      // Re-run the Server Component so the list reflects the deletion.
      router.refresh();
    } catch {
      setDeleting(false);
      window.alert('Error');
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {deleting ? '…' : label}
    </button>
  );
}
