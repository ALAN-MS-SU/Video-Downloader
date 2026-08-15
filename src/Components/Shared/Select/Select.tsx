"use client";

import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export function Select({
  ID,
  Values,
  Options,
  className,
  ...Props
}: {
  ID: string;
  Options: (string | number)[];
  Values?: (string | number)[];
} & Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "id" | "name"
>) {
  if (!Values) Values = Options;
  const Items = Values.map((Value, Index) => {
    return {
      Value,
      Option: Options[Index],
    };
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <label className="text-text font-semibold text-2xl " htmlFor={ID}>
        {ID}
      </label>
      <select
        className={`border-2 border-primary bg-transparent text-xl px-3 py-1 text-text font-semibold 
            rounded-lg outline-none cursor-pointer  ${className ? className : ""}`}
        id={ID}
        name={ID}
        {...Props}
      >
        {Items.map((Item, Index) => {
          return (
            <option key={Index} value={Item.Value}>
              {Item.Option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
