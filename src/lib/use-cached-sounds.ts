import { useEffect, useState } from "react";
import { useIsOnline } from "./use-is-online";

export function useCachedSounds(): string[] {
  const [sounds, setSounds] = useState<string[]>([]);
  const isOnline = useIsOnline();

  useEffect(() => {
    caches
      .open("sounds-v1")
      .then((cache) => cache.keys())
      .then((requests) => requests.map((req) => new URL(req.url).pathname))
      .then((pathname) => setSounds(pathname));
  }, [isOnline]);

  return sounds;
}
