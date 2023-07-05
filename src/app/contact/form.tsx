'use client';
import { type FormEventHandler, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'loading' | 'success' | 'error' | null;
export default function Form() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>(null);
  const isMutating = isPending || status === 'loading';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    const form = new FormData(el);

    try {
      setStatus('loading');
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          subject: form.get('subject'),
          message: form.get('message'),
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      setStatus('success');
      el.reset();
      startTransition(() => router.refresh());
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form
      style={{ opacity: isMutating ? 0.7 : 1 }}
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2"
    >
      <div className="flex flex-col col-span-full sm:col-span-1">
        <label
          className="text-sm text-card-foreground font-bold"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          required={true}
          name="name"
          type="text"
          autoComplete="off"
          disabled={isMutating}
          placeholder="LA"
          className="p-2 h-full placeholder:text-card-foreground bg-transparent border rounded-md border-solid border-border outline-none focus-visible:border-[#006bff] transition-colors"
        />
      </div>
      <div className="flex flex-col col-span-full sm:col-span-1">
        <label
          className="text-sm text-card-foreground font-bold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          required={true}
          name="email"
          type="email"
          disabled={isMutating}
          placeholder="la.yeah@gmail.com"
          className="p-2 h-full placeholder:text-card-foreground bg-transparent border rounded-md border-solid border-border outline-none focus-visible:border-[#006bff] transition-colors"
        />
      </div>
      <div className="flex flex-col col-span-full">
        <label
          className="text-sm text-card-foreground font-bold"
          htmlFor="subject"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required={true}
          type="text"
          autoComplete="off"
          disabled={isMutating}
          minLength={2}
          placeholder="Subject"
          className="p-2 h-full placeholder:text-card-foreground bg-transparent border rounded-md border-solid border-border outline-none focus-visible:border-[#006bff] transition-colors"
        />
      </div>
      <div className="flex flex-col col-span-full">
        <label
          className="text-sm text-card-foreground font-bold"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          required={true}
          name="message"
          minLength={2}
          disabled={isMutating}
          placeholder="Message"
          className="p-2 h-full placeholder:text-card-foreground bg-transparent border rounded-md border-solid border-border outline-none focus-visible:border-[#006bff] transition-colors min-h-[100px] resize-none"
        />
      </div>
      <button
        disabled={isMutating}
        type="submit"
        className="bg-card text-card-foreground hover:bg-border border col-span-2 border-solid border-border w-full rounded-md px-3 py-2 outline-none focus-visible:border-[#006bff] transition-colors"
      >
        {isMutating ? 'sending..' : 'send message'}
      </button>
    </form>
  );
}
