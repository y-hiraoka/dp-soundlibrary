"use client";

import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { FavoritesEffect } from "../state/favoritesState";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <FavoritesEffect />
      {children}
    </RecoilRoot>
  );
};
