import Link from "next/link";
import React from "react";
import {
    FiGithub,
    FiInstagram,
    FiYoutube,
    FiLinkedin,
    FiTwitter,
} from "react-icons/fi";
import FiverrLogo from "./FiverrLogo";
import { categories } from "@/utils/categories";
import { useRouter } from "next/router";

function Footer() {
    const socialLinks = [
        { name: "Github", icon: <FiGithub />, link: "https://www.github.com/shoha-coder" },
        {
            name: "Youtube",
            icon: <FiYoutube />,
            link: "https://www.youtube.com/",
        },
        {
            name: "LinkedIn",
            icon: <FiLinkedin />,
            link: "https://www.linkedin.com/in/soha-coder/",
        },
        {
            name: "Instagram",
            icon: <FiInstagram />,
            link: "https://instagram.com/shoha_coder",
        },
        {
            name: "Twitter",
            icon: <FiTwitter />,
            link: "https://twitter.com/shoha_coder",
        },
    ];
    let data;
    data = [
        {
            headerName: "Categories",
            links: [
                ...categories.map(({name}) => ({
                    name,
                    link: `/search?category=${name}`,
                })),
            ],
        },
        {
            headerName: "About",
            links: [
                {name: "Careers", link: "#"},
                {name: "Press & News", link: "#"},
                {name: "Partnership", link: "#"},
                {name: "Privacy Policy", link: "#"},
                {name: "Terms of Service", link: "#"},
                {name: "Intellectual Property Claims", link: "#"},
                {name: "Investor Relations", link: "#"},
            ],
        },
        {
            headerName: "Community",
            links: [
                {name: "Community Success Stories", link: "#"},
                {name: "Community Hub", link: "#"},
                {name: "Forum", link: "#"},
                {name: "Events", link: "#"},
                {name: "Blog", link: "#"},
                {name: "Influecers", link: '#'},
                {name: "Affiliates", link: "#"},
                {name: "Podcast", link: "#"},
                {name: "Invite a Friend", link: "#"},
                {name: "Become a Seller", link: "#"},
                {name: "Community Standards", link: "#"},
            ],
        },
        {
            headerName: "Move From Fiverr",
            links: [
                {name: "Fiverr Business", link: "#"},
                {name: "Fiverr Pro", link: "#"},
                {name: "Fiverr Logo Maker", link: "#"},
                {name: "Fiverr Guides", link: "#"},
                {name: "Get Inspired", link: "#"},
                {name: "Fiverr Select", link: "#"},
                {name: "ClearVoice", link: "#"},
                {name: "Fiverr Workspace", link: "#"},
                {name: "Learn", link: "#"},
                {name: "Working Not Working", link: "#"},
            ],
        },
        {
            headerName: "Support",
            links: [
                {name: "Help & Support", link: "#"},
                {name: "Trust & Safety", link: "#"},
                {name: "Selling on Fiverr", link: "#"},
                {name: "Buying on Fiverr", link: "#"},
            ],
        },
    ];
    const router = useRouter()
    return (
        <footer className={`py-16 border-t border-gray-200 bg-gray-200 ${router.pathname === "/profile" ? "hidden" : ""}`}>
            <div className={`w-full justify-evenly p200:grid p200:grid-cols-1 p200:text-center p1150:text-left p200:gap-5 lg:grid-cols-4 p1150:grid-cols-5 p500:pl-24 p450:grid-cols-2 p899:grid-cols-3 p450:text-left p450:pl-[40px]`}>
                {data.map(({ headerName, links }) => {
                    return (
                        <div key={headerName} className="flex flex-col gap-2">
                            <span className="font-bold">{headerName}</span>
                            <ul className="flex flex-col gap-2">
                                {links.map(({ name, link }) => (
                                    <li key={name} className="text-[#404145]">
                                        <Link href={link}>{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <div className="mt-12 flex flex-col items-center md:flex-row md:justify-between md:px-20">
                <FiverrLogo fillColor={"#404145"} />
                <ul className="flex gap-5 mt-4 md:mt-0">
                    {socialLinks.map(({ icon, link, name }) => (
                        <li
                            key={name}
                            className="text-xl text-[#404145] hover:text-[#1DBF73] transition-all"
                        >
                            <Link href={link}>{icon}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;