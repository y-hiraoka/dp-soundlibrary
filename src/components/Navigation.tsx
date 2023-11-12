"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import currentIndicator from "./current-indicator.svg";
import logo from "./pokeball-logo.svg";

export const Navigation: FC<{
  onNavigation?: () => void;
}> = ({ onNavigation }) => {
  return (
    <nav className="max-h-navigation w-fit space-y-6 overflow-y-auto rounded-md border-4 border-sidenav bg-white px-8 py-6">
      <Image src={logo} alt="ルートに移動する" />
      <div>
        <div className="mb-4 font-bold">ボックス</div>
        <div className="space-y-3 pl-4">
          <NavigationLink href="/rg" onNavigation={onNavigation}>
            <span className="font-bold text-pokemon-red">赤</span>・
            <span className="font-bold text-pokemon-green">緑</span>
          </NavigationLink>
          <NavigationLink href="/dp" onNavigation={onNavigation}>
            <span className="font-bold text-pokemon-diamond">ダイヤモンド</span>・
            <span className="font-bold text-pokemon-pearl">パール</span>
          </NavigationLink>
          <NavigationLink href="/favorites" onNavigation={onNavigation}>
            お気に入り
          </NavigationLink>
        </div>
      </div>
      <div>
        <div className="mb-4 font-bold">その他</div>
        <div className="space-y-3 pl-4">
          <NavigationLink href="/about" onNavigation={onNavigation}>
            サイトについて
          </NavigationLink>
          <a
            href="https://github.com/y-hiraoka/dp-soundlibrary"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={onNavigation}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavigationLink: FC<{
  href: string;
  children: ReactNode;
  onNavigation?: () => void;
}> = ({ href, children, onNavigation }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link href={href} className="relative block" onClick={onNavigation}>
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
