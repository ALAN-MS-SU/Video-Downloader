"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export function Button({
  Label,
  className,
  ...Props
}: {
  Label: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`bg-transparent cursor-pointer md:text-xl text-2xl text-text hover:bg-primary hover:text-text-hover transition-all ease-in px-3 py-2 border-2 border-solid border-primary rounded-xl ${className ? className : ""}`}
      {...Props}
    >
      {Label}
    </button>
  );
}
