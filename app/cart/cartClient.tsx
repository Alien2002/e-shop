'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link';
import React from 'react'
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utilities/formatPrice';

const CartClient = () => {
    const {CartProducts, handleClearCart, cartItemsTotalCost} = useCart();

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
        <div className='grid grid-cols-5 text-xs items-center gap-4 pb-2 mt-8'>
            <div className='col-span-2 justify-self-start'>PRODUCT</div>
            <div className='justify-self-center'>PRICE</div>
            <div className='justify-self-center'>QUANTITY</div>
            <div className='justify-self-end'>TOTAL</div>
        </div>
        <hr className='py-1'/>
        <div>
            {CartProducts && CartProducts.map((item) => {
                return <ItemContent key={item.id} item={item}/>
            })}
        </div>
        
        <div className='flex justify-between'>
            <div className='w-[100px]'>
                <Button label='Clear Cart' onclick={() => {handleClearCart(CartProducts)}} small outline/>
            </div>
            <div className=''>
                <div className='flex text-sm font-semibold justify-between w-full py-1'>
                    <span>SubTotal</span>
                    <span>{formatPrice(cartItemsTotalCost)}</span>
                </div>
                <div className='text-slate-500 mb-1'>Taxes and shipping calculated at checkout</div>
                <div>
                    <Button label='Checkout' onclick={() => {}} />
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