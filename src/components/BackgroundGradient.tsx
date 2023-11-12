"use client";

import { Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { useNowPlayingSound } from "../state/playerState";

export const BackgroundGradient: FC = () => {
  const nowPlaying = useNowPlayingSound();

  return (
    <>
      <TransitionController show={nowPlaying?.version === "DP"}>
        <div className="absolute inset-0 background-gradient-pokemon-diamond" />
        <div className="absolute inset-0 background-gradient-pokemon-pearl" />
      </TransitionController>
      <TransitionController show={nowPlaying?.version === "RG"}>
        <div className="absolute inset-0 background-gradient-pokemon-red" />
        <div className="absolute inset-0 background-gradient-pokemon-green" />
      </TransitionController>
    </>
  );
};

const TransitionController: FC<{
  show: boolean;
  children: ReactNode;
}> = ({ show, children }) => {
  return (
    <Transition
      as="div"
      show={show}
      enter="ease-out duration-[4000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-[4000ms]"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 -z-10"
    >
      {children}
    </Transition>
  );
};
