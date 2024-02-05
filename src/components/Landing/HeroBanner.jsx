import Image from "next/image";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {IoSearchOutline} from "react-icons/io5";

function HeroBanner() {
    const router = useRouter();
    const [image, setImage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const Popular = [
        {
            name: "Website Design",
            route: "/search?q=website design",
            clasName: "text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        },
        {
            name: "Wordpress",
            route: "/search?q=wordpress",
            clasName: "text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        },
        {
            name: "Logo Design",
            route: "/search?q=logo design",
            clasName: "text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        },
        {
            name: "AI Services",
            route: "/search?q=ai services",
            clasName: "text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
        }
    ]
    return (
        <div className="h-[680px] relative bg-cover">
            <div className="absolute top-0 right-0 w-[100%] h-full transition-opacity z-0">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <Image
                        key={index}
                        alt="hero"
                        src={`/bg-hero${index}.webp`}
                        fill
                        className={`${image === index ? "opacity-100" : "opacity-0"}
                transition-all duration-100 img object-cover p200:object-[-950px] lg:object-[-500px] p839:object-[-550px] p1288:object-[-300px] p1440:object-top absolute`}
                    />
                ))}
            </div>
            <div
                className="z-10 relative p200:mx-auto lg:left-[-190px] p200:top-[160px] lg:top-0 p1440:left-[-340px] p200:w-full p710:w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
                <h1 className="text-white text-5xl ml-10 max-lg:hidden">
                    Find the perfect&nbsp;
                    <i>freelance</i>
                    <br/>
                    services for your business
                </h1>
                <div className="p600:flex p200:block align-center items-center mt-10 mx-auto">
                    <div className="relative">
                        <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2"/>
                        <input
                            type="text"
                            className="h-14 p600:w-[450px] p200:w-[300px] pl-10 rounded-md p600:rounded-r-none"
                            placeholder={`Try "building mobile app`}
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-[#1DBF73] text-white px-12 text-lg font-semibold p600:rounded-l-none p200:rounded-md h-14 p200:w-[300px] p600:w-[auto] p200:mt-[15px] p600:mt-0"
                        onClick={() => router.push(`/search?q=${searchData}`)}
                    >
                        Search
                    </button>
                </div>
                <div className="text-white gap-4 p200:hidden p600:flex p600:mx-auto">
                    Popular:
                    {
                        Popular.map((search) => {
                            return (
                                <ul className="flex gap-5" key={search.name}>
                                    <li className={search.clasName}
                                        onClick={() => router.push(search.route)}>{search.name}</li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;