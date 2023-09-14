'use client';

import {
  type MutableRefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { PauseIcon, PlayIcon } from './icons';

type Audio = {
  track: MutableRefObject<HTMLAudioElement | null>;
  changeTrack: (newTrack: Audio['track']) => void;
};

const AudioContext = createContext<Audio | null>(null);

export function AudioProvider(props: React.PropsWithChildren) {
  const [track, setTrack] = useState<Audio['track']>(null);

  function changeTrack(newTrack: Audio['track']) {
    track?.current && track?.current?.pause();
    newTrack.current.play();
    setTrack(newTrack);
  }

  return (
    <AudioContext.Provider
      value={{
        track,
        changeTrack,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}

export default function PreviewTrack({ url }: { url: string }) {
  const { track, changeTrack } = useContext(AudioContext);
  const ref = useRef<HTMLAudioElement>(null);

  return (
    <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 group-hover:block">
      <button
        onClick={() => {
          if (ref.current !== track?.current) {
            changeTrack(ref);
            return;
          }

          if (ref.current?.paused) {
            ref?.current?.play();
          } else {
            ref?.current?.pause();
          }
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-card p-px text-card-foreground sm:h-12 sm:w-12"
      >
        {ref?.current?.paused ? <PlayIcon /> : <PauseIcon />}
      </button>
      <audio ref={ref} src={url} autoPlay={false} />
    </div>
  );
}
