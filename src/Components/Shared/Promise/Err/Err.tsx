"use client";

import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

export function ErrMessage({
  Message,
  Close,
}: {
  Message: string;
  Close: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-screen h-screen absolute flex justify-center items-center">
      <div className="bg-black opacity-25 absolute w-full h-full " />
      <div className="w-150 h-100 relative z-10 bg-secondary flex-col flex justify-center items-center shadow-2xl shadow-err rounded-3xl">
        <IoClose
          className="absolute text-err text-4xl right-2 top-2 cursor-pointer border-3 border-err border-solid rounded-full bg-transparent hover:bg-err hover:border-transparent hover:text-err-hover transition-colors ease-in"
          onClick={() => Close("")}
        />
        <p className="text-2xl text-justify font-semibold text-err">{Message}</p>
      </div>
    </div>
  );
}
