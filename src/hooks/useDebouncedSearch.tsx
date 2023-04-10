"use client";

import { Track } from "@lib/spotify";
import { useCallback, useRef, useState } from "react";

type Response =
 | { status: "success"; tracks: Track[] }
 | { status: "error"; error: string }
 | { status: "loading" };

export default function useDebouncedSearch() {
 const [data, setData] = useState<Response | null>(null);
 const timeoutRef = useRef<any>(null);

 const debouncedSearch = useCallback((value: string) => {
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(async () => {
   try {
    setData({ status: "loading" });
    const response = await fetch(`/api/search?q=${value}`, { method: "GET" });
    if (!response.ok) throw new Error("Failed to fetch");
    const data: { tracks: Track[] } = await response.json();
    setData({ status: "success", tracks: data.tracks });
   } catch (error) {
    console.error(error);
    setData({ status: "error", error: error?.message ?? "An error occurred" });
   }
  }, 500);
 }, []);

 return { data, timeoutRef, setData, debouncedSearch };
}
