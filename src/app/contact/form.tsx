"use client";
import { type FormEventHandler, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
const Toast = dynamic(() => import("@components/toast"));

type Status = "loading" | "success" | "error" | null;
export default function Form() {
 const router = useRouter();
 const [isPending, startTransition] = useTransition();
 const [status, setStatus] = useState<Status>(null);
 const isMutating = isPending || status === "loading";

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  const el = e.currentTarget;
  const form = new FormData(el);

  try {
   setStatus("loading");
   const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
     name: form.get("name"),
     email: form.get("email"),
     subject: form.get("subject"),
     message: form.get("message"),
    }),
   });
   if (!response.ok) throw new Error("Failed to fetch");
   setStatus("success");
   el.reset();
   startTransition(() => router.refresh());
  } catch (error) {
   setStatus("error");
  }
 };

 return (
  <>
   <form
    style={{ opacity: isMutating ? 0.7 : 1 }}
    onSubmit={handleSubmit}
    className="mt-8 grid grid-cols-1 w-[480px] max-w-full sm:grid-cols-2 gap-2"
   >
    <div className="flex flex-col gap-2">
     <label htmlFor="name">Name</label>
     <input
      id="name"
      required={true}
      name="name"
      type="text"
      autoComplete="off"
      disabled={isMutating}
      placeholder="John Doe"
      className="hover:placeholder:text-tw-black focus-visible:placeholder:text-tw-black dark:hover:placeholder:text-tw-white dark:focus-visible:placeholder:text-tw-white rounded-md p-2 bg-tw-black/10 dark:bg-tw-white/10"
     />
    </div>
    <div className="flex flex-col gap-2">
     <label htmlFor="email">Email</label>
     <input
      id="email"
      required={true}
      name="email"
      type="email"
      disabled={isMutating}
      placeholder="johndoe@gmail.com"
      className="hover:placeholder:text-tw-black focus-visible:placeholder:text-tw-black dark:hover:placeholder:text-tw-white dark:focus-visible:placeholder:text-tw-white rounded-md p-2 bg-tw-black/10 dark:bg-tw-white/10"
     />
    </div>
    <div className="flex flex-col gap-2 sm:col-span-2">
     <label htmlFor="subject">Subject</label>
     <input
      id="subject"
      name="subject"
      required={true}
      type="text"
      autoComplete="off"
      disabled={isMutating}
      minLength={2}
      placeholder="Subject"
      className="hover:placeholder:text-tw-black focus-visible:placeholder:text-tw-black dark:hover:placeholder:text-tw-white dark:focus-visible:placeholder:text-tw-white rounded-md p-2 bg-tw-black/10 dark:bg-tw-white/10"
     />
    </div>
    <div className="flex flex-col gap-2 sm:col-span-2">
     <label htmlFor="message">Message</label>
     <textarea
      id="message"
      required={true}
      name="message"
      minLength={2}
      disabled={isMutating}
      placeholder="Message"
      className="hover:placeholder:text-tw-black focus-visible:placeholder:text-tw-black dark:hover:placeholder:text-tw-white dark:focus-visible:placeholder:text-tw-white rounded-md p-2 bg-tw-black/10 dark:bg-tw-white/10 min-h-[100px]"
     />
    </div>
    <button
     disabled={isMutating}
     type="submit"
     className="bg-tw-secondary w-full justify-self-end text-tw-black rounded-md px-3 py-2"
    >
     {isMutating ? "Sending.." : "Send message!"}
    </button>
   </form>
   <AnimatePresence>
    {(status === "success" || status === "error") && (
     <Toast
      status={status}
      success="Thanks for messaging!"
      error="Oh no.. an error.."
      setStatus={setStatus}
     />
    )}
   </AnimatePresence>
  </>
 );
}
