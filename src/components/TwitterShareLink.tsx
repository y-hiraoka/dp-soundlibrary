import { ComponentProps, forwardRef } from "react";

type Props = {
  text: string;
  url?: string;
  hashtags?: string[];
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const TwitterShareLink = forwardRef<HTMLAnchorElement, Props>(
  ({ text, url, hashtags, ...otherProps }, forwardedRef) => {
    const href =
      `https://twitter.com/share` +
      `?text=${text.replace(/\r?\n/g, "%0a")}` +
      (hashtags ? `&hashtags=${hashtags.join(",")}` : "") +
      (url ? `&url=${url}` : "");

    return (
      <a
        ref={forwardedRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...otherProps}
      />
    );
  }
);

if (process.env.NODE_ENV === "development") {
  TwitterShareLink.displayName = "TwitterShareLink";
}
