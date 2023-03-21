import { useSyncExternalStore } from "react";

const getState = () => {
  return navigator.onLine;
};

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);

  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
};

export function useIsOnline(): boolean {
  return useSyncExternalStore(subscribe, getState, () => true);
}
