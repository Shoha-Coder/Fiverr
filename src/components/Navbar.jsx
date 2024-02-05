import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import FiverrLogo from './FiverrLogo';
import { useStateProvider } from '@/context/StateContext';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"
import axios from 'axios';
import { GET_USER_INFO, HOST } from '@/utils/constants';
import { reducerCases } from '@/context/constants';
import Image from 'next/image';
import ContextMenu from './ContextMenu';

const Navbar = () => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isFixed, setIsFixed] = useState(false)
    const [searchData, setSearchData] = useState("")
    const [{ showLoginModal, showSignupModal, userInfo, isSeller }, dispatch] = useStateProvider()
    const handleLogin = () => {
        if (showSignupModal) {
            dispatch({
                type: reducerCases.TOGGLE_SIGNUP_MODAL,
                showSignupModal: false,
            })
        }
        dispatch({
            type: reducerCases.TOGGLE_LOGIN_MODAL,
            showLoginModal: true,
        })
    }
    const handleSignup = () => {
        if (showLoginModal) {
            dispatch({
                type: reducerCases.TOGGLE_LOGIN_MODAL,
                showLoginModal: true,
            })
        }
        dispatch({
            type: reducerCases.TOGGLE_SIGNUP_MODAL,
            showSignupModal: true,
        })
    }
    useEffect(() => {
        if (router.pathname === "/") {
            const positionNavbar = () => {
                window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
            };
            window.addEventListener("scroll", positionNavbar);
            return () => window.removeEventListener("scroll", positionNavbar);
        } else {
            setIsFixed(true);
        }
    }, [router.pathname]);
    const links = [
        { linkName: "Fiverr Business", handler: "#", type: "link" },
        { linkName: "Explore", handler: "#", type: "link" },
        { linkName: "English", handler: "#", type: "link" },
        { linkName: "Become a Seller", handler: "#", type: "link" },
        { linkName: "Sign in", handler: handleLogin, type: "button" },
        { linkName: "Join", handler: handleSignup, type: "button2" },
    ];

    useEffect(() => {
        if (cookies.jwt &&  !userInfo) {
            const getUserInfo = async () => {
                try {
                    const {
                        data: { user }
                    } = await axios.post(GET_USER_INFO, {}, {
                        headers: {
                            Authorization: `Bearer ${cookies.jwt}`,
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    let projectedUserInfo = { ...user }
                    if (user.profileImage) {
                        projectedUserInfo = {
                            ...projectedUserInfo,
                            imageName: HOST + "/" + user.profileImage
                        }
                    }
                    delete projectedUserInfo.image;
                    dispatch({
                        type: reducerCases.SET_USER,
                        userInfo: projectedUserInfo,
                    })
                    setIsLoaded(true)
                    if (user.isProfileInfoSet === false) {
                        router.push("/profile")
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            getUserInfo();
        } else {
            setIsLoaded(true)
        }
    }, [cookies, userInfo])
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    useEffect(() => {
        const clickListener = (e) => {
            e.stopPropagation();

            if (isContextMenuVisible) setIsContextMenuVisible(false);
        };
        if (isContextMenuVisible) {
            window.addEventListener("click", clickListener);
        }
        return () => {
            window.removeEventListener("click", clickListener);
        };
    }, [isContextMenuVisible]);
    const ContextMenuData = [
        {
            name: "Profile",
            callback: (e) => {
                e.stopPropagation();

                setIsContextMenuVisible(false);
                router.push("/profile");
            },
        },
        {
            name: "Logout",
            callback: (e) => {
                e.stopPropagation();

                setIsContextMenuVisible(false);
                router.push("/logout");
            },
        },
    ];

    const handleOrdersNavigate = () => {
        if (isSeller) router.push("/seller/orders");
        else router.push("/buyer/orders")
    }
    const handleModeSwitch = () => {
        if (isSeller) {
            dispatch({ type: reducerCases.SWITCH_MODE })
            router.push("/buyer/orders")
        } else {
            dispatch({ type: reducerCases.SWITCH_MODE })
            router.push("/seller")
        }
    }
    const logout = userInfo && router.pathname === "/profile" ? "Logout" : ""
    return (
        <React.Fragment>
            {isLoaded && (
                <nav
                    className={`w-full px-4 flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${isFixed || userInfo
                        ? 'fixed bg-white border-b border-gray-200'
                        : ''
                        }`}
                >
                    <div>
                        <Link href="/">
                            <FiverrLogo fillColor={!isFixed && !userInfo ? '#404145' : '#404145'} />
                        </Link>
                    </div>
                    <div className={`flex ${isFixed || userInfo ? 'opacity-100' : 'opacity-0'}`}>
                        <input
                            type="text"
                            className={`w-1/2 mintf:w-[150px] p200  p200:opacity-0 maxtf:opacity-100 p200:ml-[30px] p200:-mr-[10px] minn:w-[350px] minn:h-[50px] py-2.5 px-4 border bg-white focus:outline-none ${!userInfo && !cookies.jwt ? "hidden" : ""}`}
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                            placeholder="What service are you looking for today?"
                        />
                        <button
                            className={`bg-gray-900 py-1.5 mintf:w-[45px] p200  p200:opacity-0 maxtf:opacity-100 minn:h-[50px] minn:w-[65px] text-white w-12 md:w-16 xl:w-20 flex justify-center items-center ${!userInfo && !cookies.jwt ? "hidden" : ""}`}
                            onClick={() => {
                                setSearchData('');
                                router.push(`/search?q=${searchData}`);
                            }}
                        >
                            <IoSearchOutline className="fill-white text-white h-6 w-6 mintf:text-[1px]" />
                        </button>
                    </div>
                    {!userInfo ? (
                        <ul className="flex gap-6 items-center w-full justify-end">
                            {links.map(({ linkName, handler, type }) => {
                                return (
                                    <li key={linkName} className={`${isFixed ? 'text-base' : ''} font-medium`}>
                                        {type === 'link' && <Link href={handler}>{linkName}</Link>}
                                        {type === 'button' && <button onClick={handler}>{linkName}</button>}
                                        {type === 'button2' && (
                                            <button
                                                onClick={handler}
                                                className={`border text-md font-semibold py-1 px-3 rounded-sm ${isFixed
                                                    ? 'border-[#1dbf73] text-[#1dbf73]'
                                                    : ''
                                                    } hover:bg-[#1dbf73] hover:text-white hover:border-[#1dbf73] transition-all duration-500`}
                                            >
                                                {linkName}
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul className="flex items-center gap-6">
                            {isSeller && (
                                <li
                                    className="cursor-pointer text-[#1dbf73] font-medium"
                                    onClick={() => router.push("/seller/gigs/create")}
                                >
                                    Create Gig
                                </li>
                            )}
                            <li
                                className="cursor-pointer text-[#1dbf73] font-medium"
                                onClick={handleOrdersNavigate}
                            >
                                Orders
                            </li>
                            <li className="cursor-pointer font-medium" onClick={handleModeSwitch}>
                                Switch To {isSeller ? 'Buyer' : 'Seller'}
                            </li>
                            <Link href={"http://localhost:3000/logout"} className="cursor-pointer font-sm text-red-700">
                                {logout}
                            </Link>
                                <li
                                    className="cursor-pointer -mr-2 md:mr-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsContextMenuVisible(true);
                                    }}
                                    title="Profile"
                                >
                                    {userInfo.imageName ? (
                                        <Image
                                            src={userInfo.imageName}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                                            <span className="text-xl text-white">{userInfo.email[0].toUpperCase()}</span>
                                        </div>
                                    )}
                                </li>
                        </ul>
                    )}
                    {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
                </nav>
            )
            }
        </React.Fragment >
    )
}

export default Navbar;