import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai-family";
import { MutableRefObject, useCallback, useMemo } from "react";
import { dp_sounds } from "../data/dp";
import { SoundData } from "../data/sound-type";

type AudioState = {
  volume: number;
  isPlaying: boolean;
  isPaused: boolean;
  nowPlaying: SoundData | undefined;
};

const audioStateAtom = atom<AudioState>({
  volume: 0.5,
  isPlaying: false,
  isPaused: false,
  nowPlaying: undefined,
});

const contextRef: MutableRefObject<AudioContext | undefined> = { current: undefined };
const sourceNodeRef: MutableRefObject<AudioBufferSourceNode | undefined> = {
  current: undefined,
};
const gainNodeRef: MutableRefObject<GainNode | undefined> = { current: undefined };

const startAudioAtom = atom(null, (get, set, soundData: SoundData) => {
  const audioState = get(audioStateAtom);

  if (!contextRef.current) {
    const _context = new AudioContext();
    _context.addEventListener("statechange", () => {
      set(audioStateAtom, (prev) => ({
        ...prev,
        isPaused: _context.state === "suspended",
      }));
    });
    contextRef.current = _context;
  }

  const context = contextRef.current;

  const sourceNode = context.createBufferSource();
  const gainNode = context.createGain();

  fetch(soundData.file)
    .then((r) => r.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      if (soundData.loopStart !== undefined) {
        sourceNode.loopStart = soundData.loopStart;
      }
      if (soundData.loopEnd !== undefined) {
        sourceNode.loopEnd = soundData.loopEnd;
      }
      sourceNode.connect(gainNode);

      gainNode.gain.value = audioState.volume;
      gainNode.connect(context.destination);

      sourceNodeRef.current?.stop();
      sourceNode.start();
      if (context.state === "suspended") {
        context.resume();
      }
      sourceNodeRef.current = sourceNode;
      gainNodeRef.current = gainNode;

      set(audioStateAtom, (prev) => ({
        ...prev,
        isPlaying: true,
        nowPlaying: soundData,
      }));
    });
});

const setVolumeAtom = atom(null, (get, set, volume: number) => {
  volume = volume < 0 ? 0 : 1 < volume ? 1 : volume;

  if (gainNodeRef.current) {
    gainNodeRef.current.gain.value = volume;
  }
  set(audioStateAtom, (prev) => ({ ...prev, volume }));
});

export const useAudioState = (): AudioState => useAtomValue(audioStateAtom);
export const useAudioPlayer = (): {
  start: (soundData: SoundData) => void;
  resume: () => Promise<void>;
  pause: () => Promise<void>;
  setVolume: (volume: number) => void;
} => {
  const start = useSetAtom(startAudioAtom);
  const setVolume = useSetAtom(setVolumeAtom);

  const resume = useCallback(async () => {
    if (!contextRef.current) {
      if (process.env.NODE_ENV === "development") {
        console.warn("You must start audio at first.");
      }
      return;
    }

    await contextRef.current.resume();
  }, []);

  const pause = useCallback(async () => {
    if (!contextRef.current) {
      if (process.env.NODE_ENV === "development") {
        console.warn("You must start audio at first.");
      }
      return;
    }

    await contextRef.current.suspend();
  }, []);

  return useMemo(
    () => ({ start, resume, pause, setVolume }),
    [pause, resume, setVolume, start],
  );
};

const nowPlayingSoundAtom = atom((get) => get(audioStateAtom).nowPlaying);

const nextSoundAtom = atom<SoundData>((get) => {
  const nowPlaying = get(nowPlayingSoundAtom);

  if (nowPlaying === undefined) return dp_sounds[0];

  const currentIndex = dp_sounds.findIndex((s) => s.id === nowPlaying.id);
  return dp_sounds[(currentIndex + 1) % dp_sounds.length];
});

const prevSoundAtom = atom<SoundData>((get) => {
  const nowPlaying = get(nowPlayingSoundAtom);

  if (nowPlaying === undefined) return dp_sounds[dp_sounds.length - 1];

  const currentIndex = dp_sounds.findIndex((s) => s === nowPlaying);
  return dp_sounds[currentIndex - 1 < 0 ? dp_sounds.length - 1 : currentIndex - 1];
});

export const useNowPlayingSound = (): SoundData | undefined =>
  useAtomValue(nowPlayingSoundAtom);
export const useNextSound = (): SoundData => useAtomValue(nextSoundAtom);
export const usePrevSound = (): SoundData => useAtomValue(prevSoundAtom);

const isNowPlayingAtomFamily = atomFamily((soundId: string) =>
  atom((get) => {
    const current = get(nowPlayingSoundAtom);
    return current?.id === soundId;
  }),
);

export const useIsNowPlaying = (soundId: string): boolean =>
  useAtomValue(isNowPlayingAtomFamily(soundId));
