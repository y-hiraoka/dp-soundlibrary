"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import Image from "next/image";
import { FC, useId } from "react";
import {
  categories,
  useActiveCategories,
  useToggleActiveCategory,
} from "../state/filteringState";
import pokeball from "./pokeball-side-current.svg";

export const Filtering: FC = () => {
  const activeCategories = useActiveCategories();
  const toggleActiveCategory = useToggleActiveCategory();

  return (
    <div className="w-full overflow-x-auto rounded-md border border-white/10 bg-black/80 p-4 backdrop-blur">
      <div className="flex w-max space-x-2">
        {categories.map((category) => {
          const isActive = activeCategories.includes(category);
          return (
            <PokeCheckbox
              key={category}
              checked={isActive}
              label={category}
              onCheckedChange={() => toggleActiveCategory(category)}
            />
          );
        })}
      </div>
    </div>
  );
};

const PokeCheckbox: FC<{
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, onCheckedChange, label }) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center space-x-1 rounded-full border border-white/30 px-3 py-2"
    >
      <Checkbox.Root
        className="flex h-4 w-4 appearance-none items-center justify-center rounded-full data-[state=unchecked]:border data-[state=unchecked]:border-white/30"
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={id}
      >
        <Checkbox.Indicator className="">
          <Image src={pokeball} alt="" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className="cursor-pointer text-sm font-bold leading-none text-white">
        {label}
      </span>
    </label>
  );
};
