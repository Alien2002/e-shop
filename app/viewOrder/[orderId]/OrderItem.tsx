
import { formatPrice } from '@/utilities/formatPrice'
import { TruncateText } from '@/utilities/truncateText'
import { cartProductType } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface OrderItemProps {
    product: cartProductType
}

const OrderItem = ({product}: OrderItemProps) => {
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center '>
        <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
            <div className='relative w-[70px] aspect-square'>
                <Image
                    src = {product.selectedImage.image}
                    alt = {product.name}
                    fill
                    className='object-contain'
                />
            </div>
            <div>{TruncateText(product.name)}</div>
            <div>{product.selectedImage.color}</div>
        </div>
        <div className='justify-self-center'>{formatPrice(product.price)}</div>
        <div className='justify-self-center'>{product.quantity}</div>
        <div className='justify-self-end font-semibold'>{formatPrice((product.price * product.quantity))}</div>
    </div>
  )
}

export default OrderItem