import {GET_USER_GIGS_ROUTE} from '@/utils/constants'
import axios from 'axios'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {GrAddCircle} from "react-icons/gr"
import {useRouter} from 'next/router'
import {useStateProvider} from "@/context/StateContext";

const index = () => {
    const [cookies] = useCookies()
    const [{userInfo}] = useStateProvider()
    const [gigs, setGigs] = useState([])
    const router = useRouter();
    useEffect(() => {
        const getUserGigs = async () => {
            try {
                const {
                    data: {gigs: gigsData},
                } = await axios.get(GET_USER_GIGS_ROUTE, {
                    headers: {
                        Authorization: `Bearer ${cookies.jwt}`
                    }
                });
                setGigs(gigsData);
            } catch (err) {
                console.log(err);
            }
        }
        userInfo ? getUserGigs() : router.push("/")
    }, [userInfo]);
    return (
        <div className='min-h-[auto] my-10 mt-0 p1150:px-32'>
            <h3 className="p1150:m-5 text-2xl font-semibold">All Your Gigs</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="p634:px-6 p200:pl-2 py-3">
                            Name
                        </th>
                        <th scope="col" className="p634:px-6 py-3">
                            <div className="flex items-center">
                                Category
                                <a href="#">
                                    <svg className="w-3 h-3 ml-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="p634:px-6 py-3">
                            <div className="flex items-center">
                                Price
                                <a href="#">
                                    <svg className="w-3 h-3 ml-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="p634:px-6 py-3">
                            <div className="flex items-center">
                                Delivery time
                                <a href="#">
                                    <svg className="w-3 h-3 ml-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="p634:px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        gigs.map(({title, category, price, deliveryTime, id}) => {
                            return (
                                <tr className="bg-white border-b" key={id}>
                                    <th scope="row" className="p634:px-6 p200:pl-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {title.length > 3 ? title.substring(0, 3) & "..." : title}
                                    </th>
                                    <td className="p634:px-6 py-4">
                                        {category}
                                    </td>
                                    <td className="p634:px-6 py-4">
                                        {price}
                                    </td>
                                    <td className="p634:px-6 py-4">
                                        {deliveryTime}
                                    </td>
                                    <td className="p634:px-6 p200:pr-6 py-4 text-right">
                                        <Link href={`/seller/gigs/${id}`}
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                    <tfoot onClick={() => router.push("/seller/gigs/create")}>
                    <tr className="bg-white border-b">
                        <td scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap" colSpan={5}>
                            <GrAddCircle className="m-auto font-bold" fontSize={25}/>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default index