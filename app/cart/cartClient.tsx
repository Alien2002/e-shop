'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link';
import React from 'react'
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utilities/formatPrice';
import { useRouter } from 'next/navigation';

interface CartClientProps {
    isUserLoggedIn: boolean
} 

const CartClient = ({isUserLoggedIn}: CartClientProps) => {
    const {CartProducts, handleClearCart, cartItemsTotalCost} = useCart();
    const router = useRouter();

    //if user is not logged in........................
    if(!isUserLoggedIn) {
        return <div className='flex flex-col items-center'>
            <div className='text-2xl'>You have to log in to view you cart...</div>
            <div>
                <Link href={'/login'} className='text-slate-500 flex items-center gap-1 mt-2'>
                    <MdArrowBack />
                    <span>Log in...</span>
                </Link>
            </div>
        </div>
    }

    //if there is nothing in the cart...
    if(!CartProducts || CartProducts.length === 0) {
        return <div className='flex flex-col items-center'>
            <div className='text-2xl'>Your Cart is empty...</div>
            <div>
                <Link href={'/'} className='text-slate-500 flex items-center gap-1 mt-2'>
                    <MdArrowBack />
                    <span>Start Shopping...</span>
                </Link>
            </div>
        </div>
    }

    //if there is items in the cart...
  return (
    <div>
        <Heading title='SHOPPING CART' center/>
        <div className='overflow-x-auto'>
            <div className='grid grid-cols-5 text-xs items-center gap-4 pb-2 mt-8 min-w-[550px]'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            <hr className='py-1'/>
            <div className='min-w-[550px]'>
                {CartProducts && CartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item}/>
                })}
            </div>
        </div>
        
        <div className='flex flex-col justify-between sm:flex-row gap-8'>
            <div className='w-[100px]'>
                <Button label='Clear Cart' onclick={() => {handleClearCart(CartProducts)}} small outline/>
            </div>
            <div className='max-w-[300px]'>
                <div className='flex text-sm font-semibold justify-between w-full py-1'>
                    <span>SubTotal</span>
                    <span>{formatPrice(cartItemsTotalCost)}</span>
                </div>
                <div className='text-slate-500 mb-1'>Taxes and shipping calculated at checkout</div>
                <div>
                    <Button label='Create Order' onclick={() => {router.push('/createOrder')}} />
                    <div className='text-sm'>
                    <Link href={'/'} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <MdArrowBack />
                        <span>Continue Shopping...</span>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartClient