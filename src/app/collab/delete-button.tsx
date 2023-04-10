"use client";
import type { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@components/icons";

export default function DeleteButton({ id }: { id: string }) {
 const router = useRouter();

 const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
  try {
   const response = await fetch(`/api/collab/${id}`, { method: "DELETE" });
   if (!response.ok) throw new Error("Failed to fetch");
   if (response.status === 202) {
    router.refresh();
   }
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <button
   title="Remove recommendation"
   aria-label="remove recommendation"
   onClick={handleClick}
   className="text-tw-gray h-max mt-[2px] hover:text-red-600 focus:text-red-600"
  >
   <TrashIcon className="W-4 h-4 text-inherit" />
  </button>
 );
}
