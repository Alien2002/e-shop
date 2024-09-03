'use client'

import { useCart } from "@/hooks/useCart"
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";




const CheckoutClient = () => {
    const {CartProducts, paymentIntent, handleSetPaymentIntent} = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    const router = useRouter();


    
    useEffect(() => {
        //creating payment intent as soon as the page loads...
        if(CartProducts) {
            setIsLoading(true)
            setError(false)


            //
            fetch('/api/create/route', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    items: CartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                console.log("Request in progresss....")

                //if unauthorized to perform request...
                if(res.status === 401) {
                    console.log('Unauthorized, redirecting to login page....')
                    return router.push('/login')
                }

                //if request succeeded...
                if(res.ok) {return res.json();}    //returning the payment intent...

                console.log('<><><><><><><>><><<><><>"', res.status ,'"<><<><><><><><><><><><><<>')
                //Handling other errors by rejjecting with parsed JSON 
                return res.json().then(err => Promise.reject(err))
                   
            }).then((data) => {
                console.log("Recieved data: ", data)
                setClientSecret(data.paymentIntent.clientSecret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                setError(true)
                console.log('Error>>>>>>>>>>>> ', error)
                toast.error('Something went very wrong')
            })
        }
    },[CartProducts, paymentIntent])
    //console.log('payment intent>>>>', paymentIntent)
    //console.log('client secret>>>', clientSecret)
  return (
    <></>
  )
}

export default CheckoutClient