import FiverrLogo from "@/components/FiverrLogo";
import React from "react";
import Link from "next/link";

const BurgerUsr = ({data}) => {
    return (
        <div
            className={`z-10  bg-white divide-y divide-gray-100 shadow-2xl border w-44 h-screen fixed top-[59px] right-0 flex items-center pl-6`}
        >
            <ul className="py-0 text-sm text-gray-700 -mt-[160px] p1109:hidden">
                <FiverrLogo fillColor={"#404145"} />
                <h1 className="mb-16"></h1>
                {data.map(({name, callback, type}, index) => {
                    return (
                        <li key={index} className={`font-medium flex flex-col items-start`}>
                            {type === 'link' && <Link href={callback} className="mt-12">{name}</Link>}
                            {type === 'button' && <button onClick={callback} className="mt-12">{name}</button>}
                            {type === 'button2' && (
                                <button
                                    onClick={callback}
                                    className={`border text-md font-semibold py-1 px-3 rounded-sm mt-12
                                    } hover:bg-[#1dbf73] hover:text-white hover:border-[#1dbf73] transition-all duration-500`}
                                >
                                    {name}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default BurgerUsr