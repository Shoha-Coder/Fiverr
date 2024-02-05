import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
function Everything() {
    const everythingData = [
        {
            title: "Stick to your budget",
            subtitle:
                "Find the right service for every price point. No hourly rates, just project-based pricing.",
        },
        {
            title: "Get quality work done quickly",
            subtitle:
                "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
        },
        {
            title: "Pay when you're happy",
            subtitle:
                "Upfront quotes mean no surprises. Payments only get released when you approve.",
        },
        {
            title: "Count on 24/7 support",
            subtitle:
                "Our round-the-clock support team is available to help anytime, anywhere.",
        },
    ];
    return (
        <div className="bg-[#f1fdf7] flex py-20 justify-between p200:justify-center p200:pl-[90px]">
            <div>
                <h2 className="p500:text-4xl p200:text-xl p400:text-2xl p450:text-3xl mb-5 text-[#404145] font-bold">
                    The best part? Everything   
                </h2>
                <ul className="flex flex-col p200:gap-5 p1150:gap-10">
                    {everythingData.map(({ title, subtitle }) => {
                        return (
                            <li key={title}>
                                <div className="flex gap-2 items-center p450:text-xl p200:text-sm">
                                    <BsCheckCircle className="text-[#62646a]" />
                                    <h4>{title}</h4>
                                </div>
                                <p className="text-[#62646a]">{subtitle}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="relative h-96 w-2/4 p200:opacity-0">
                <Image src="/everything.webp" objectFit="contain" width={700} height={250} alt="everything" />
            </div>
        </div>
    );
}

export default Everything;
