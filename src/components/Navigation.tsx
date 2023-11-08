"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import currentIndicator from "./current-indicator.svg";
import logo from "./pokeball-logo.svg";

export const Navigation: FC = () => {
  return (
    <nav className="w-fit space-y-6 rounded-md border-4 border-sidenav bg-white px-8 py-6">
      <Image src={logo} alt="ルートに移動する" />
      <div>
        <div className="mb-4 font-bold">ボックス</div>
        <div className="space-y-3 pl-4">
          <NavigationLink href="/rg">
            <span className="font-bold text-red">赤</span>・
            <span className="font-bold text-green">緑</span>
          </NavigationLink>
          <NavigationLink href="/dp">
            <span className="font-bold text-diamond">ダイヤモンド</span>・
            <span className="font-bold text-pearl">パール</span>
          </NavigationLink>
          <NavigationLink href="/favorites">お気に入り</NavigationLink>
        </div>
      </div>
      <div>
        <div className="mb-4 font-bold">その他</div>
        <div className="space-y-3 pl-4">
          <NavigationLink href="/about">サイトについて</NavigationLink>
          <NavigationLink href="/favorites">GitHub</NavigationLink>
        </div>
      </div>
    </nav>
  );
};

const NavigationLink: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link href={href} className="relative block">
      {isActive && (
        <Image
          src={currentIndicator}
          alt=""
          className="absolute -left-4 top-1/2 -translate-y-1/2"
        />
      )}
      {children}
    </Link>
  );
};
