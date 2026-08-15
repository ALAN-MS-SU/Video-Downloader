"use client";

import { Dispatch, SetStateAction } from "react";

export function Loading({
  Close,
}: {
  Close: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute w-screen h-screen z-10 flex flex-col justify-center items-center ">
      <div className="relative flex justify-center items-center rounded-full w-80 h-80 shadow-2xl shadow-secondary">
        <div className="absolute rounded-full border-l-8 border-secondary w-full h-full animate-loading " />
        <span className="font-bold text-4xl text-text-light bg-secondary px-6 py-4 rounded-full">
          Loading
        </span>
      </div>
      <div className="bg-black opacity-25 absolute w-full h-full" />
    </div>
  );
}
