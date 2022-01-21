import { MutableRefObject, useCallback, useMemo } from "react";
import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { SoundData, sounds } from "../data/sounds";

type AudioState = {
  volume: number;
  isPlaying: boolean;
  isPaused: boolean;
  nowPlaying: SoundData | undefined;
};

const audioStateAtom = atom<AudioState>({
  key: "audioStateAtom",
  default: {
    volume: 0.5,
    isPlaying: false,
    isPaused: false,
    nowPlaying: undefined,
  },
});

const contextRef: MutableRefObject<AudioContext | undefined> = { current: undefined };
const sourceNodeRef: MutableRefObject<AudioBufferSourceNode | undefined> = {
  current: undefined,
};
const gainNodeRef: MutableRefObject<GainNode | undefined> = { current: undefined };

export const useAudioState = () => useRecoilValue(audioStateAtom);
export const useAudioPlayer = () => {
  const setAudioState = useSetRecoilState(audioStateAtom);

  const start = useRecoilCallback(
    ({ snapshot }) =>
      (soundData: SoundData) => {
        const audioState = snapshot.getLoadable(audioStateAtom).getValue();

        if (!contextRef.current) {
          const _context = new AudioContext();
          _context.addEventListener("statechange", () => {
            setAudioState((prev) => ({
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

            setAudioState((prev) => ({
              ...prev,
              isPlaying: true,
              nowPlaying: soundData,
            }));
          });
      },
    [setAudioState]
  );

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

  const setVolume = useCallback(
    (volume: number) => {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume;
      }
      setAudioState((prev) => ({ ...prev, volume }));
    },
    [setAudioState]
  );

  return useMemo(
    () => ({ start, resume, pause, setVolume }),
    [pause, resume, setVolume, start]
  );
};

const nowPlayingSoundSelector = selector({
  key: "nowPlayingSoundSelector",
  get: ({ get }) => get(audioStateAtom).nowPlaying,
});

const nextSoundSelector = selector<SoundData>({
  key: "nextSoundSelector",
  get: ({ get }) => {
    const nowPlaying = get(nowPlayingSoundSelector);

    if (nowPlaying === undefined) return sounds[0];

    const currentIndex = sounds.findIndex((s) => s.id === nowPlaying.id);
    return sounds[(currentIndex + 1) % sounds.length];
  },
});

const prevSoundSelector = selector<SoundData>({
  key: "prevSoundSelector",
  get: ({ get }) => {
    const nowPlaying = get(nowPlayingSoundSelector);

    if (nowPlaying === undefined) return sounds[sounds.length - 1];

    const currentIndex = sounds.findIndex((s) => s === nowPlaying);
    return sounds[currentIndex - 1 < 0 ? sounds.length - 1 : currentIndex - 1];
  },
});

export const useNowPlayingSound = () => useRecoilValue(nowPlayingSoundSelector);
export const useNextSound = () => useRecoilValue(nextSoundSelector);
export const usePrevSound = () => useRecoilValue(prevSoundSelector);

const isNowPlayingSelectorFamily = selectorFamily({
  key: "isPlayingSelectorFamily",
  get:
    (soundId: string) =>
    ({ get }) => {
      const current = get(nowPlayingSoundSelector);
      return current?.id === soundId;
    },
});

export const useIsNowPlaying = (soundId: string) =>
  useRecoilValue(isNowPlayingSelectorFamily(soundId));
