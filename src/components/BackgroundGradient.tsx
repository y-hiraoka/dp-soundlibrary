"use client";

import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { FC } from "react";
import { useNowPlayingSound } from "../state/playerState";

export const BackgroundGradient: FC = () => {
  const nowPlaying = useNowPlayingSound();

  return (
    <Transition
      as="div"
      show={nowPlaying !== undefined}
      enter="ease-out duration-[4000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-[4000ms]"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 -z-10"
    >
      {nowPlaying?.id.startsWith("dp") && (
        <>
          <div className={classNames("absolute inset-0 background-theming-diamond")} />
          <div className={classNames("absolute inset-0 background-theming-pearl")} />
        </>
      )}
      {nowPlaying?.id.startsWith("rg") && (
        <>
          <div className={classNames("absolute inset-0 background-theming-red")} />
          <div className={classNames("absolute inset-0 background-theming-green")} />
        </>
      )}
    </Transition>
  );
};
