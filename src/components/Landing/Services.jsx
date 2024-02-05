import { categories } from "@/utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Services() {
    const router = useRouter();

    return (
        <div className="my-16 ">
            <h2 className="text-4xl mb-10 text-[#404145] font-bold p200:text-center">
                You need it, we&apos;ve got it
            </h2>
            <ul className="grid p200:grid-cols-3 gap-10 p1150:grid-cols-5">
                {categories.map(({ name, logo }) => {
                    return (
                        <li
                            key={name}
                            className="flex flex-col justify-center items-center cursor-pointer hover:shadow-2xl hover:border-[#1DBF73]  border-2 border-transparent p-5 transition-all duration-500"
                            onClick={() => router.push(`/search?category=${name}`)}
                        >
                            <Image src={logo} alt="category" height={50} width={50} />
                            <span>{name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Services;
