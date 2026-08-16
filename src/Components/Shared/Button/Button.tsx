"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export function Button({
  Label,
  className,
  type,
  ...Props
}: {
  Label: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`bg-transparent cursor-pointer text-xl md:text-2xl text-text hover:bg-primary hover:text-text-light transition-all ease-in px-3 py-2 border-2 border-solid border-primary rounded-xl ${className ? className : ""}`}
      type={type ? type : "button"}
      {...Props}
    >
      {Label}
    </button>
  );
}
