import classNames from "classnames";
import { ComponentProps, ReactNode, forwardRef } from "react";

type Props = Omit<ComponentProps<"button">, "children"> & {
  icon: ReactNode;
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  color?: "contrast" | "yellow";
  variant?: "outline" | "ghost" | "solid";
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton(
  { icon, color = "contrast", variant = "outline", size = "md", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      {...props}
      type={props.type ?? "button"}
      className={classNames(
        "inline-flex items-center justify-center transition-colors",
        {
          sm: "text-xl w-8 h-8",
          md: "text-3xl w-10 h-10",
          lg: "text-3xl w-12 h-12",
        }[size],
        {
          outline: classNames(
            "border rounded-full",
            {
              contrast: "border border-white text-contrast hover:bg-white/10",
              yellow: "border border-yellow text-yellow",
            }[color],
          ),
          ghost: classNames(
            "rounded",
            {
              contrast: "text-contrast hover:bg-white/10",
              yellow: "text-yellow hover:bg-yellow/20",
            }[color],
          ),
          solid: classNames(
            "rounded-full",
            {
              contrast: "bg-white text-black hover:bg-white/80",
              yellow: "",
            }[color],
          ),
        }[variant],
        props.className,
      )}
    >
      {icon}
    </button>
  );
});
