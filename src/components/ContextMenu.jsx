import { useRouter } from "next/router";
import React from "react";
import FiverrLogo from "@/components/FiverrLogo";
import Link from "next/link";

function ContextMenu({ data }) {
  const router = useRouter();
  return (
    <div
      className={`z-10  bg-white divide-y divide-gray-100  shadow-2xl border w-44 p394:w-24 p394:top-[50px] p394:right-[25px]
      fixed p899:right-[30px] p974:top-[60px] p200:right-0 p200:top-0 p200:bottom-0 p394:bottom-auto p200:items-center p200:justify-center p200:flex p200:flex-col`}
    >
      <Link href={"/"} className={"p394:hidden"}>
        <FiverrLogo fillColor={"#404145"} />
      </Link>
      <ul className="py-2 text-sm text-gray-700">
        {data.map(({ name, callback, clas }, index) => {
          return (
            <li
              key={index}
              onClick={callback}
              className={`block px-4 py-2 hover:bg-gray-100 cursor-pointer p200:mt-20 p394:mt-0 ${clas}`}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContextMenu;
