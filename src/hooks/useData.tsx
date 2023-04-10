"use client";

import { useCallback, useState } from "react";

type Response<T> =
 | { status: "success"; data: T }
 | { status: "error"; error: string }
 | { status: "loading" };

export default function useData<T>(url: string, init: RequestInit) {
 const [data, setData] = useState<Response<T>>();

 const fetchData = useCallback(async () => {
  try {
   setData({ status: "loading" });
   const response = await fetch(url, init);
   if (!response.ok) throw new Error("Failed to fetch");
   const data = await response.json();
   setData({ status: "success", data });
  } catch (error) {
   setData({ status: "error", error: error?.message ?? "An error occurred" });
  }
 }, [url, init]);

 return { data, fetchData };
}
