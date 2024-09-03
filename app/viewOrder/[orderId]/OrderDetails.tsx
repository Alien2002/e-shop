
import Heading from '@/app/components/Heading'
import Status from '@/app/components/Status'
import { formatPrice } from '@/utilities/formatPrice'
import { Order } from '@prisma/client'
import moment from 'moment'
import React from 'react'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'
import OrderItem from './OrderItem'

interface OrderDetailsProps {
    order: Order
}

const OrderDetails = ({order}: OrderDetailsProps) => {
  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
        <div className='mt-8'>
            <Heading title="Order Details" />
        </div>
        <div>Order Id: {order.id}</div>
        <div>
            Total Amount: {" "}
            <span className='font-bold'>{formatPrice(order.amount)}</span>
        </div>
        <div className='flex gap-2 items-center'>
            <div>Payment Status: </div>
            <div className='max-w-fit flex'>
            {order.status === 'pending'? 
                    (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-teal-200" color="text-teal-700" />)  
                : order.status === 'completed'? 
                    (<Status text="completed" icon={MdDone} bg="bg-green-400" color="text-green-800" />)
                : <></>
                }
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <div>Delivery Status: </div>
            <div className='max-w-fit flex'>
                {order.deliveryStatus === 'pending'? 
                    (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-teal-200" color="text-teal-700" />)  
                    : order.deliveryStatus === 'dispatched'? 
                    (<Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />)
                    : order.deliveryStatus === 'delivered'?
                    (<Status text="delivered" icon={MdDone} bg="bg-green-400" color="text-green-800" />)
                    : <></>
                }
            </div>
        </div>
        <div >Created Time: {moment(order.createdDate).fromNow()}</div>
        <div>
            <h2 className='font-semibold mt-4 mb-2'>Products Ordered</h2>
            <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            {order.products && order.products.map((item) => {
                return <OrderItem key={item.id} product={item} />
            })}
        </div>
    </div>
  )
}

export default OrderDetails