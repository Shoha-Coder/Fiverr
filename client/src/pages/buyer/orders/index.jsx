import { useStateProvider } from "@/context/StateContext";
import { GET_BUYER_ORDERS_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Orders() {
  const [cookies] = useCookies()
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_BUYER_ORDERS_ROUTE, { headers: { Authorization: `Bearer ${cookies.jwt}`, } });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) {
      getOrders()
    }
  }, [userInfo]);

  console.log(orders)
  return (
    <div className="min-h-[80vh] my-10 mt-0 p500:px-24 mx-auto px-auto">
      <h3 className="text-2xl font-semibold mx-auto mb-10 ml-12">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p200:w-[90%] mx-auto ">
        <table className="w-full text-sm text-left text-gray-500 p200:w-[90%]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 p200:w-[100%]">
            <tr className="text-gray-700 uppercase bg-gray-50 p200:text-[5px] p1089:text-xs p200:w-[90%]">
              <th scope="col" className="p200:px-3 p1089:px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="p200:px-1 p1089:px-6 py-3">
                Name
              </th>
              <th scope="col" className="p200:px-1 p1089:px-6 py-3">
                Category
              </th>
              <th scope="col" className="p200:px-1 p1089:px-6 py-3">
                Price
              </th>
              <th scope="col" className="p200:px-0 p1089:px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="p200:px-1 p1089:px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="cpy-3">
                Send Message
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white hover:bg-gray-50 p200:text-[6px] p1089:text-xs"
                  key={order.id}
                >
                  <th scope="row" className="px-6 py-4">
                    {order.id}
                  </th>
                  <th scope="row" className="p200:px-1 p1089:px-6 py-4 font-medium">
                    {order.gig.title}
                  </th>
                  <td className="p200:px-1 p1089:px-6 py-4">{order.gig.category}</td>
                  <td className="p200:px-1 p1089:px-6 py-4">{order.price}</td>
                  <td className="p200:px-1 p1089:px-6 py-4">{order.gig.deliveryTime}</td>
                  <td className="p200:px-1 p1089:px-6 py-4">{order.createdAt.split("T")[0]}</td>

                  <td className="px-6 py-4 ">
                    <Link
                      href={`/buyer/orders/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
