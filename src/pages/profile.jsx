import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { HOST, SET_USER_IMAGE, SET_USER_INFO } from '@/utils/constants';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const profile = () => {
    const [cookies] = useCookies()
    const router = useRouter()
    const [{ userInfo }, dispatch] = useStateProvider()
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageHover, setImageHover] = useState(false)
    const [image, setImage] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState({
        userName: "",
        fullName: "",
        description: "",
    })
    useEffect(() => {
        const handleData = { ...data }
        if (userInfo) {
            if (userInfo?.username) handleData.userName = userInfo?.username
            if (userInfo?.description) handleData.description = userInfo?.description
            if (userInfo?.fullName) handleData.fullName = userInfo?.fullName
        }

        if (userInfo?.imageName) {
            const fileName = image
            fetch(userInfo.imageName).then(async (response) => {
                const contentType = response.headers.get("content-type")
                const blob = await response.blob()
                const files = new File([blob], fileName, { contentType })
                setImage(files)
            })
        }

        setData(handleData)
        setIsLoaded(true)
    }, [userInfo])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleFile = (e) => {
        let file = e.target.files
        const fileType = file[0]["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            setImage(file[0])
        }
    }

    const setProfile = async () => {
        try {
            const response = await axios.post(SET_USER_INFO, { ...data }, { headers: { Authorization: `Bearer ${cookies.jwt}`, } })
            if (response.data.userNameError) {
                setErrorMessage("Enter a unique username")
            } else {
                setErrorMessage("")
                let imageName = ""
                if (image) {
                    const formData = new FormData()
                    formData.append("images", image)
                    const { data: { img } } = await axios.post(SET_USER_IMAGE, formData, {
                        headers: {
                            Authorization: `Bearer ${cookies.jwt}`,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    imageName = img;
                }
                dispatch({
                    type: reducerCases.SET_USER,
                    userInfo: {
                        ...userInfo,
                        ...data,
                        image: imageName.length ? HOST + "/" + imageName : false,
                    },
                })
                if (response.status === 200) {
                    router.push("/")
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    const inputClassName =
        "block p-4 w-full text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    const labelClassName =
        "mb-2 text-lg font-medium text-gray-900 derk:text-white focus:outline-none"
    return (
        <>
            {
                isLoaded && (
                    <div className='flex flex-col items-center justify-start min-h-[90vh] gap-3'>
                        {errorMessage && (
                            <div>
                                <span className="text-red-600 font-bold">{errorMessage}</span>
                            </div>
                        )}
                        <h2 className="text-3xl">Welcome To Fiverr Clone</h2>
                        <h4 className="text-xl">Please Complate Your Profile To Get Started</h4>
                        <div className="flex flex-col items-center w-full gap-5">
                            <div className='flex flex-col items-center cursor-pointer'
                                onMouseEnter={() => setImageHover(true)}
                                onMouseLeave={() => setImageHover(false)}>
                                <label className={labelClassName} htmlFor="">
                                    Set a profile picture
                                </label>
                                <div className='bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative'>
                                    {image ? (
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt="Profile"
                                            sizes='50px 50px'
                                            fill
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <span className="text-6xl text-white">
                                            {userInfo?.email[0].toUpperCase()}
                                        </span>
                                    )}
                                    <div className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center transition-all duration-100 ${imageHover ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        <span className="flex items-center justify-center relative">
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='h-12 w-12 text-white absolute left-[3.3rem]'
                                                viewBox='0 0 20 20'
                                                fill='currentColor'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <input
                                                type="file"
                                                onChange={handleFile}
                                                className='opacity-0'
                                                multiple={true}
                                                name="profileImage"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-[500px]">
                                <div>
                                    <label className={labelClassName} htmlFor='username'>
                                        Please Select a username
                                    </label>
                                    <input type="text" className={inputClassName} name='userName' placeholder='Username' value={data.userName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClassName} htmlFor='fullName'>
                                        Please Enter your Fullname
                                    </label>
                                    <input type="text" className={inputClassName} name='fullName' placeholder='Full Name' value={data.fullName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex flex-col w-[500px]'>
                                <label htmlFor="description" className={labelClassName}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    className={inputClassName}
                                    placeholder='description'
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <button className='border text-lg font-semibold px-5 py-3 border-[#1dbf73] bg-[#1dbf73] text-white rounded-md'
                                type='button'
                                onClick={setProfile}
                            >
                                Set Profile
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default profile;