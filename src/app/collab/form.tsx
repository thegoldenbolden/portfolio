"use client";
import type { Track } from "@lib/spotify";

import { ChevronDownIcon, ThumbsUpIcon } from "@components/icons";
import { Transition, Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import {
 type FormEventHandler,
 Fragment,
 useCallback,
 useEffect,
 useRef,
 useState,
 useTransition,
} from "react";

type Response =
 | { status: "success"; tracks: Track[] }
 | { status: "error"; error: string }
 | { status: "loading" };

export default function Form() {
 const router = useRouter();
 const [pending, startTransition] = useTransition();
 const [fetching, setFetching] = useState(false);
 const mutating = fetching || pending;

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);

  try {
   setFetching(true);
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
   startTransition(() => router.refresh());
  } catch (error) {
   console.error(error);
  } finally {
   setFetching(false);
  }
 };

 return (
  <div className="sm:order-last">
   <form
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
      />
      <label htmlFor="anonymous">Anonymous</label>
     </div>
     <button
      type="submit"
      className="flex items-center gap-2 text-tw-secondary hover:text-tw-primary focus:text-tw-primary"
      disabled={mutating}
     >
      <ThumbsUpIcon className="w-4 h-4 text-inherit" />
      Recommend
     </button>
    </div>
    <Search />
    <div className="flex gap-2 bg-tw-gray-10 rounded-md">
     <label htmlFor="content" className="sr-only">
      Add a comment
     </label>
     <input
      className="bg-transparent outline-none text-sm p-2 text-tw-white grow"
      id="content"
      maxLength={140}
      name="content"
      placeholder="Type message"
     />
     <button
      type="submit"
      className="flex bg-tw-secondary my-px rounded-md px-6 text-sm items-center gap-2 text-tw-gray-10 hover:bg-tw-secondary"
      disabled={mutating}
     >
      Send
     </button>
    </div>
   </form>
   <div />
  </div>
 );
}

function Search() {
 const [query, setQuery] = useState("");
 const [data, setData] = useState<Response | null>();
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

 useEffect(() => {
  query.length ? debouncedSearch(query) : setData(null);
  return () => clearTimeout(timeoutRef.current);
 }, [query, debouncedSearch]);

 return (
  <>
   <div className="w-full">
    <Combobox name="track">
     <div className="relative">
      <div className="relative w-full overflow-hidden rounded-md">
       <Combobox.Input
        autoComplete="off"
        placeholder="Search tracks"
        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-tw-gray-10 text-tw-white"
        displayValue={(track: Track) => track.name}
        onChange={(e) => setQuery(e.target.value)}
       />
       <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon className="h-5 w-5 text-tw-gray" aria-hidden="true" />
       </Combobox.Button>
      </div>
      {data && (
       <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
       >
        <Combobox.Options className="absolute backdrop-blur-md mt-1 w-full overflow-hidden rounded-md focus:outline-none">
         {data.status === "loading" ? (
          <div className="relative p-2 text-tw-white">Loading tracks..</div>
         ) : data.status === "error" ? (
          <div className="relative p-2 text-tw-white">{data.error}</div>
         ) : !data.tracks.length ? (
          <div className="relative p-2 text-tw-white">No tracks found.</div>
         ) : (
          data.tracks.map((track) => (
           <Combobox.Option
            key={track.id}
            className="relative p-2 text-gray-900"
            value={{ name: track.name, id: track.id }}
           >
            <div className="flex items-center gap-2">
             {track.album.images?.[0] && (
              <Image
               src={track.album.images[0].url}
               alt={`album ${track.album.name} cover image`}
               height={48}
               width={48}
               className="aspect-square text-tw-white rounded-md object-cover"
              />
             )}
             <div className="flex flex-col gap-px truncate">
              <NextLink
               target="_blank"
               rel="noreferrer noopener"
               href={track.external_urls.spotify}
               className="text-tw-white text-ellipsis overflow-hidden hover:underline focus:underline"
              >
               {track.name}
              </NextLink>
              <div className="text-sm text-ellipsis overflow-hidden text-tw-gray">
               {track.artists.map((artist, i) => (
                <Fragment key={artist.id}>
                 <NextLink
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer noopener"
                 >
                  {artist.name}
                 </NextLink>
                 {track.artists[i + 1] ? <>{", "}</> : null}
                </Fragment>
               ))}
              </div>
             </div>
            </div>
           </Combobox.Option>
          ))
         )}
        </Combobox.Options>
       </Transition>
      )}
     </div>
    </Combobox>
   </div>
  </>
 );
}
