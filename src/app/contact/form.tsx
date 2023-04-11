"use client";
import { type FormEventHandler, useEffect, useState } from "react";

export default function Form() {
 const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
  null
 );

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

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
  } catch (error) {
   setStatus("error");
  }
 };

 useEffect(() => {
  let timeout: NodeJS.Timeout;
  if (status !== null) {
   timeout = setTimeout(() => {
    clearTimeout(timeout);
    setStatus(null);
   }, 3000);
  }
  return () => timeout && clearTimeout(timeout);
 }, [status]);

 return (
  <>
   {status === "success" ? (
    <p>Thanks for messaging me!</p>
   ) : status === "error" ? (
    "Ooops, an error happened while sending the message."
   ) : null}
   <form
    onSubmit={handleSubmit}
    className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
   >
    <div className="flex flex-col gap-2">
     <label htmlFor="name">Name</label>
     <input
      id="name"
      name="name"
      type="text"
      placeholder="John Doe"
      className="hover:placeholder:text-tw-white rounded-sm p-2 bg-white/10"
     />
    </div>
    <div className="flex flex-col gap-2">
     <label htmlFor="email">Email</label>
     <input
      id="email"
      name="email"
      type="email"
      placeholder="johndoe@gmail.com"
      className="hover:placeholder:text-tw-white rounded-sm p-2 bg-white/10"
     />
    </div>
    <div className="flex flex-col gap-2 sm:col-span-2">
     <label htmlFor="subject">Subject</label>
     <input
      id="subject"
      name="subject"
      type="text"
      minLength={2}
      placeholder="Subject"
      className="hover:placeholder:text-tw-white rounded-sm p-2 bg-white/10"
     />
    </div>

    <div className="flex flex-col gap-2 sm:col-span-2">
     <label htmlFor="message">Message</label>
     <textarea
      id="message"
      name="message"
      minLength={2}
      placeholder="Message"
      className="hover:placeholder:text-tw-white rounded-sm p-2 bg-white/10 min-h-[100px]"
     />
    </div>
    <button
     disabled={status === "loading"}
     type="submit"
     className="bg-tw-secondary w-1/2 justify-self-end sm:col-start-2 text-tw-black rounded-sm px-3 py-2"
    >
     {!status ? "Send" : status === "loading" ? "Loading..." : "Send"}
    </button>
   </form>
  </>
 );
}
