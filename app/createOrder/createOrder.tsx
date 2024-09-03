'use client'

import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import Input from "@/app/components/inputs/input"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"
import { cartProductType, Order } from "@prisma/client"
import Container from "../components/Container/Container"
import FormWrap from "../components/FormWrap"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/utilities/formatPrice"

export type ImageType = {
  color: string,
  colorCode: string,
  image: File | null
}

export type UploadedImageType = {
  color: string,
  colorCode: string,
  image: string
}

type CreateOrder = Order;

const CreateOrder = ({currentUser}: {currentUser: any}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [productsChoosen, setProductsChoosen] = useState<cartProductType[] | null>(null)
    const [amount, setAmount] = useState(0)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const {cartItemsTotalCost}  = useCart()

    
    const router = useRouter()

    //handling accept terms..........
    const termsAccepted = useCallback(() => {
      setAcceptTerms(!acceptTerms)
    },[])

    
    
    
    //retrieving data from localstorage database..............
    useEffect(() => {
      const cartItems: any = localStorage.getItem('EshopCartItems')
      const cProduct: cartProductType[] | null = JSON.parse(cartItems)
      
      setProductsChoosen(cProduct)
    },[])
    
    
    
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
      defaultValues: {
        amount,
        status: 'pending',
        deliveryAddress: {
          region: '',
          line1: '',
          district: '',
          street: ''
        },
        deliveryStatus: 'pending',
        createdDate: new Date(),
        products: productsChoosen,
      }
    })
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      
      const userId = currentUser.id
      if(userId) {
        const dataToUpload = {
          ...data,
          products: productsChoosen,
          userId: userId,
          amount: cartItemsTotalCost,
          
        }
        //posting the product to mongo database....
        axios.post('/api/createOrder', dataToUpload).then(() => {
          toast.success('Your Order was successfully created...')
          router.push('/cart')
        }).catch((error) => {
          toast.error('Something went wrong while connecting to database...', error)
          console.log('Errorr...>>>>>', error)
        }).finally(() => {
          setIsLoading(false)
        })
      }
    }
    
    if(!currentUser) {
        return <div className='flex flex-col items-center'>
            <div className='text-2xl'>You have to log in to make an order...</div>
            <div>
                <Link href={'/login'} className='text-slate-500 flex items-center gap-1 mt-2'>
                    <MdArrowBack />
                    <span>Log in...</span>
                </Link>
            </div>
        </div>
    }

  return (
    <Container>
      <FormWrap>
        <div className="w-[80%]">
          <div className='mt-8'>
              <Heading title="Order Details" center />
              <div>Order Id: <span className="text-rose-400 text-sm">To be generated after making order</span></div>
          </div>
          <div className="w-[85%] pt-4">
            <div className='grid grid-cols-4 text-xs gap-2 pb-2 items-center font-semibold'>
              <div className='col-span-2 justify-self-start'>PRODUCT</div>
              <div className='justify-self-center'>QUANTITY</div>
              <div className='justify-self-end'>TOTAL COST</div>
            </div>
            <hr />
            {productsChoosen?.map((product) => {
              return <div key={product.id} className='grid grid-cols-4 text-xs gap-2 pb-2 items-center text-slate-600'>
                <div className='col-span-2 justify-self-start'>{product.name}</div>
                <div className='justify-self-center'>{product.quantity}</div>
                <div className='justify-self-end'>{formatPrice(product.quantity * product.price)}</div>
              </div>
            })
            }
            <hr />
            <div className="grid grid-cols-4 text-[12px] gap-3 pb-2">
              <div className="col-span-3 justify-self-end font-semibold w-[20%]">Total</div>
              <div className="justify-self-end font-semibold text-teal-600">{formatPrice(cartItemsTotalCost)}</div>
            </div>
          </div>
        </div>
        <div>
          <Heading title="Fill in the following order form to confirm order." center />
          <form></form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input 
              id="deliveryAddress.line1"
              label="Phone Number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input 
              id="deliveryAddress.region"
              label="Region"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input 
              id="deliveryAddress.district"
              label="District"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="deliveryAddress.street"
              label="Street"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <div className={`flex text-sm ${acceptTerms? 'text-slate-700' : 'text-slate-300'}`}>
              <input
                type="checkbox" 
                id="inStock"
                onClick={termsAccepted}
              />
              <label>Accept Terms and Conditions.</label>
            </div>
          </div>

          {acceptTerms? 
            <Button label={isLoading? 'Loading...' : 'Submit Order'} onclick={handleSubmit(onSubmit)} />
          :
            <div>
            <Button disabled label='Submit Order' onclick={() => {}} />
            </div>
          }
        </div>
      </FormWrap>

    </Container>
  )
}

export default CreateOrder