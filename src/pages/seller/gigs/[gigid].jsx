import ImageUpload from '@/components/ImageUpload'
import { categories } from '@/utils/categories'
import { EDIT_GIG_DATA, GET_GIG_DATA, HOST } from '@/utils/constants'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const GigId = () => {
    const [cookies] = useCookies()
    const router = useRouter()
    const { gigid } = router.query
    const [files, setFile] = useState([])
    const [features, setFeatures] = useState([])
    const [data, setData] = useState({
        title: "",
        category: "",
        description: "",
        time: 0,
        revisions: 0,
        feature: "",
        price: 0,
        shortDesc: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const addFeature = () => {
        if (data.feature) {
            setFeatures([...features, data.feature])
            setData({ ...data, feature: "" })
        }
    }

    const removeFeature = (index) => {
        const clonedFeatures = [...features]
        clonedFeatures.splice(index, 1)
        setFeatures(clonedFeatures)
    }
    const editGig = async () => {
        const { category, description, price, revisions, time, title, shortDesc } = data;
        if (category &&
            description &&
            title &&
            features.length &&
            files.length &&
            price > 0 &&
            shortDesc.length &&
            revisions > 0 &&
            time > 0) {
            const formData = new FormData()
            files.forEach((file) => formData.append("images", file))
            const gigData = {
                title,
                description,
                category,
                features,
                price,
                revisions,
                time,
                shortDesc,
            };
            const response = await axios.put(`${EDIT_GIG_DATA}/${gigid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${cookies.jwt}`
                },
                params: gigData,
            })
            if (response.status === 200) { router.push("/seller/gigs") }
        }
    };
    useEffect(() => {
        const fetchGigData = async () => {
            try {
                const { data: { gig }, } = await axios.get(`${GET_GIG_DATA}/${gigid}`)
                setData({ ...gig, time: gig.revisions })
                setFeatures(gig.features)
                gig.images.forEach((image) => {
                    const url = HOST + '/uploads/' + image
                    const fileName = url
                    fetch(url).then(async (response) => {
                        const contentType = response.headers.get("content-type")
                        const blob = await response.blob()
                        const files = new File([blob], fileName, { contentType })
                        setFile([files])
                    })
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchGigData()
    }, [gigid])
    const inputClassName =
        "block p-4 w-full text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    const labelClassName =
        "mb-2 text-lg font-medium text-gray-900 derk:text-white focus:outline-none"
    return (
        <div className='min-h-[80vh] my-10 mt-0 px-32'>
            <h1 className='text-6xl text-gray-900 mb-5'>Edit Gig</h1>
            <h3 className="text-3xl text-gray-900 mb-5">
                Enter the details to edit the gig
            </h3>
            <div className="flex flex-col gap-5 mt-10">
                <div className="grid grid-cols-2 gap-11">
                    <div>
                        <label htmlFor="title" className={labelClassName}>Gig Title</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            id='title'
                            className={inputClassName}
                            placeholder='eg. I will do something I, really good at'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className={labelClassName}>
                            Select a category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className='bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-4 focus:outline-none'
                            onChange={handleChange}
                            value={data.category}
                        >
                            {categories.map(({ name }) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className={labelClassName}>
                        Gig description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className='block p-2.5 w-full text-sm 
                    text-gray-900 bg-gray-50 rounded-lg 
                    border-gray-300 focus:ring-blue-500 border 
                    focus:border-blue-500 focus:outline-none'
                        placeholder='Write a description'
                        value={data.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-11">
                    <div>
                        <label htmlFor="delivery" className={labelClassName}>Gig delivery</label>
                        <input
                            type="number"
                            name="time"
                            value={data.time}
                            onChange={handleChange}
                            id='delivery'
                            className={inputClassName}
                            placeholder='Minimum delivery time'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="revision" className={labelClassName}>Gig Revision</label>
                        <input
                            type="number"
                            name="revisions"
                            value={data.revisions}
                            onChange={handleChange}
                            id='revision'
                            className={inputClassName}
                            placeholder='Minimum rivision time'
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-11">
                    <div>
                        <label htmlFor="features" className={labelClassName}>Gig features</label>
                        <div className='flex gap-3 items-center mb-5'>
                            <input
                                type="text"
                                name="feature"
                                value={data.feature}
                                onChange={handleChange}
                                id='features'
                                className={inputClassName}
                                placeholder='Enter a Feature Name'
                            />
                            <button
                                type='button'
                                className='focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium text-lg px-10 py-3 rounded-md'
                                onClick={addFeature}
                            >
                                Add
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-11">
                            <ul className='flex gap-2 flex-wrap'>
                                {features.map((feature, index) => (
                                    <li
                                        key={index + feature}
                                        className='flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200'
                                    >
                                        <span>{feature}</span>
                                        <span
                                            className='text-red-700'
                                            onClick={() => removeFeature(index)}
                                        >X</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className={labelClassName}>
                            Gig Images
                        </label>
                        <div>
                            <ImageUpload files={files} setFile={setFile} />
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-11">
                    <div>
                        <label htmlFor="shortDesc" className={labelClassName}>Short Description</label>
                        <input
                            type="text"
                            name="shortDesc"
                            value={data.shortDesc}
                            onChange={handleChange}
                            id='shortDesc'
                            className={inputClassName}
                            placeholder='Enter a short description'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className={labelClassName}>Gig price ( $ )</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            id='price'
                            className={inputClassName}
                            placeholder='Enter a price'
                            required
                        />
                    </div>
                </div>
                <button
                    className="border text-lg font-semibold px-5 py-3 border-[#1dbf73] bg-[#1dbf73] text-white rounded-md"
                    type="button"
                    onClick={editGig}
                >
                    Edit Gig
                </button>
            </div>
        </div>
    )
}

export default GigId