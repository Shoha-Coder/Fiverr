import { useRouter } from "next/router";
import React from "react";

function ContextMenu({ data }) {
  const router = useRouter();
  return (
    <div
      className={`z-10  bg-white divide-y divide-gray-100  shadow-2xl border w-44
      fixed p200:top-[53px] p200:right-[20px] p899:right-[30px] p974:top-[60px]
      `}
    >
      <ul className="py-2 text-sm text-gray-700">
        {data.map(({ name, callback }, index) => {
          return (
            <li
              key={index}
              onClick={callback}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
