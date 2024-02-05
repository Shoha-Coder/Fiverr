import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { CREATE_ORDER } from "@/utils/constants";

const stripePromise = loadStripe("pk_test_51Nshc6F5vapQAG2ifSHIl7uYLB6sVKtM7G1CTiCEyRPpZrCiXu2IgRXD8cLZ9nPIKcqOyrwnVSGtLSpmvQ0e5vIY00OhZIGDZJ");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies()
  const router = useRouter()
  const { gigId } = router.query

  useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { gigId },
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`
            }
          }
        )
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.log(error);
      }
    }
    if (gigId) {
      createOrder()
    }
  }, [gigId])

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(error => console.error(error));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please Complete the payment to place the order
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}