import type { Track } from "@lib/spotify";
import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import NextLink from "next/link";
import Image from "next/image";

type Response =
 | { status: "success"; tracks: Track[] }
 | { status: "error"; error: string }
 | { status: "loading" };

export default function SearchTracks() {
 const [query, setQuery] = useState("");
 const [data, setData] = useState<Response | null>();
 const timeoutRef = useRef<any>(null);

 const debouncedSearch = useCallback((value: string) => {
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(async () => {
   try {
    setData({ status: "loading" });
    const response = await fetch(`/api/search?q=${value}`, {
     method: "GET",
     next: { revalidate: 60 },
    });
    if (!response.ok) throw response;
    const data: { tracks: Track[] } = await response.json();
    setData({ status: "success", tracks: data.tracks });
   } catch (error) {
    const message =
     error.status === 401
      ? "Try logging in again?"
      : error.message ?? "An error occurred";
    setData({ status: "error", error: message });
   }
  }, 1000);
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
        required={true}
        placeholder="Search tracks"
        className="w-full placeholder:text-tw-gray border-none py-2 pl-3 pr-10 text-sm leading-5 bg-tw-black/10 text-tw-black dark:bg-tw-gray-10 dark:text-tw-white"
        displayValue={(track: Track) => track.name}
        onChange={(e) => setQuery(e.target.value)}
       />
      </div>
      {data && (
       <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
       >
        <Combobox.Options className="absolute bg-tw-white dark:bg-tw-black mt-1 w-full overflow-hidden rounded-md focus:outline-none">
         <div className="bg-tw-black/10 dark:bg-tw-gray-10">
          {data.status === "loading" ? (
           <div className="relative p-2 text-tw-black dark:text-tw-white">
            Loading tracks..
           </div>
          ) : data.status === "error" ? (
           <div className="relative p-2 text-tw-black dark:text-tw-white">
            {data.error}
           </div>
          ) : !data.tracks.length ? (
           <div className="relative p-2 text-tw-black dark:text-tw-white">
            No tracks found.
           </div>
          ) : (
           data.tracks.map((track) => (
            <Combobox.Option
             key={track.id}
             className="relative p-2 text-gray-900 hover:bg-tw-secondary/25 ui-active:bg-tw-secondary/25 focus:bg-tw-secondary/25"
             value={{ name: track.name, id: track.id }}
            >
             <div className="flex items-center gap-2">
              {track.album.images?.[0] && (
               <Image
                src={track.album.images[0].url}
                alt={`album ${track.album.name} cover image`}
                height={48}
                width={48}
                className="aspect-square text-tw-black dark:text-tw-white rounded-md object-cover"
               />
              )}
              <div className="flex flex-col gap-px truncate">
               <NextLink
                target="_blank"
                rel="noreferrer noopener"
                href={track.external_urls.spotify}
                className="text-tw-black dark:text-tw-white text-ellipsis overflow-hidden hover:underline focus:underline"
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
         </div>
        </Combobox.Options>
       </Transition>
      )}
     </div>
    </Combobox>
   </div>
  </>
 );
}
