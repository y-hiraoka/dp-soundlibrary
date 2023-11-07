"use client";

import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
