'use client';
import type { Status } from '../../types';
import { type MouseEventHandler, useState, useTransition } from 'react';
import { TrashIcon } from '@components/icons';
import { useRouter } from 'next/navigation';

export default function RemoveButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>(null);
  const isMutating = isPending || status === 'loading';
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      setStatus('loading');
      const response = await fetch(`/api/collab/${id}`, { method: 'DELETE' });
      if (!response.ok) throw response;
      if (response.status !== 202 && response.status !== 204) throw response;
      setStatus('success');
      startTransition(() => router.refresh());
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <button
      disabled={isMutating}
      title="Remove"
      aria-label="remove recommendation"
      onClick={(e) => handleClick(e)}
      className="text-tw-gray h-max mt-[2px] hover:text-red-600 focus:text-red-600"
    >
      <TrashIcon className="W-4 h-4 text-inherit" />
    </button>
  );
}
