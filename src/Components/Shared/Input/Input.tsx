"use client";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input({
  ID,
  className,
  ...Props
}: { ID: string } & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "id" | "name"
>) {
  return (
    <div
      className={`flex ${Props.type == "checkbox" ? "flex-row" : "sm:flex-row flex-col"} justify-center items-center gap-5 w-4/5 h-1/4`}
    >
      <input
        id={ID}
        name={ID}
        className={`border-solid border-2 border-primary rounded-2xl outline-none ${className ? className : ""}`}
        {...Props}
      />
    </div>
  );
}
