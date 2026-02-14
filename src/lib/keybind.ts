import { RefObject, useEffect, useEffectEvent } from "react";

type KeybindProps = {
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  key: KeyboardEvent["key"];
  onKeyDown?: (event: KeyboardEvent) => void;
  targetRef?: RefObject<HTMLElement>;
};

export function useKeybind({
  altKey,
  ctrlKey,
  metaKey,
  shiftKey,
  key,
  onKeyDown,
  targetRef,
}: KeybindProps) {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (altKey && !event.altKey) return;
    if (ctrlKey && !event.ctrlKey) return;
    if (metaKey && !event.metaKey) return;
    if (shiftKey && !event.shiftKey) return;
    if (event.key !== key) return;

    event.preventDefault();
    onKeyDown?.(event);
  });

  useEffect(() => {
    if (targetRef?.current) {
      const target = targetRef.current;

      target.addEventListener("keydown", handleKeyDown);
      return () => target.removeEventListener("keydown", handleKeyDown);
    } else {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [targetRef]);
}
