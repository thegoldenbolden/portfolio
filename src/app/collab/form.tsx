"use client";
import type { Status } from "../../types";
import { type FormEventHandler, useState, useTransition } from "react";
import { ThumbsUpIcon } from "@components/icons";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchTracks from "./search-tracks";
import dynamic from "next/dynamic";

const Toast = dynamic(() => import("@components/toast"));

export default function Form() {
 const router = useRouter();
 const [isPending, startTransition] = useTransition();
 const [status, setStatus] = useState<Status>(null);
 const isMutating = status === "loading" || isPending;

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  if (isMutating) return;
  const el = e.currentTarget;
  const form = new FormData(el);

  try {
   setStatus("loading");
   const response = await fetch("/api/collab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     content: form.get("content"),
     track_name: form.get("track[name]"),
     track_id: form.get("track[id]"),
     anonymous: !!form.get("anonymous"),
    }),
   });

   if (!response.ok) throw new Error("Failed to fetch");
   if (response.status !== 201) throw new Error(response.statusText);
   setStatus("success");
   el.reset();
   startTransition(() => router.refresh());
  } catch (error) {
   setStatus("error");
  }
 };

 return (
  <div className="sm:order-last">
   <form
    style={{ opacity: isMutating ? 0.7 : 1 }}
    onSubmit={handleSubmit}
    className="flex flex-col gap-2 sm:sticky sm:top-6"
   >
    <div className="flex flex-wrap justify-between items-center gap-2">
     <div className="flex flex-wrap gap-2 md:grow">
      <input
       aria-label="anonymous"
       type="checkbox"
       id="anonymous"
       name="anonymous"
       disabled={isMutating}
      />
      <label htmlFor="anonymous">Anonymous</label>
     </div>
     <button
      type="submit"
      className="flex items-center gap-2 text-tw-secondary hover:text-tw-black focus-visible:text-tw-black dark:hover:text-tw-primary dark:focus-visible:text-tw-primary"
      disabled={isMutating}
     >
      <ThumbsUpIcon className="w-4 h-4 text-inherit" />
      Recommend
     </button>
    </div>
    <SearchTracks />
    <div className="flex gap-2 text-tw-black bg-tw-black/10 dark:text-tw-white dark:bg-tw-gray-10 rounded-md">
     <label htmlFor="content" className="sr-only">
      Add a comment
     </label>
     <input
      className="placeholder:text-tw-gray rounded-md border-none py-2 px-3 text-sm leading-5 bg-transparent w-full"
      id="content"
      maxLength={140}
      disabled={isMutating}
      name="content"
      autoComplete="off"
      placeholder="Type message"
     />
    </div>
    <button
     type="submit"
     className="bg-tw-secondary p-2 flex items-center justify-center gap-2 rounded-md text-sm text-tw-gray-10 hover:bg-tw-primary focus-visible:bg-tw-primary"
     disabled={isMutating}
    >
     <ThumbsUpIcon className="h-5 w-5" />
     <span>{isMutating ? "Recommending.." : "Recommend"}</span>
    </button>
   </form>
   <AnimatePresence>
    {(status === "error" || status === "success") && (
     <Toast
      setStatus={setStatus}
      status={status}
      success="Thanks for the recommendation!"
      error="Oops, unable to post recommendation."
     />
    )}
   </AnimatePresence>
  </div>
 );
}
