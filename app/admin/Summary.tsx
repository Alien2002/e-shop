'use client'
import { Order, product, User } from "@prisma/client"
import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import { formatPrice } from "@/utilities/formatPrice"
import { formatNumber } from "@/utilities/formatNumber"

 

interface SummaryProps {
    orders: Order[],
    products: product[],
    users: User[]
}

type SummaryDataType = {
    [key: string]: {
        label: string,
        digit: number
    }
}

const Summary = ({orders, products, users}: SummaryProps) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sales: {
            label: 'Total Sales',
            digit: 0
        },
        products: {
            label: 'Total Products',
            digit: 0
        },
        orders: {
            label: 'Total Orders',
            digit: 0
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: 0
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: 0
        },
        users: {
            label: 'Total Users',
            digit: 0
        }
    })

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = {...prev}

            const totalSales = orders.reduce((acc, item) => {
                if(item.status === 'completed') {
                    return acc + item.amount
                }else return acc
            }, 0)

            const paidOrders = orders.filter((order => {
                return order.status === 'completed'
            }))

            const unpaidOrders = orders.filter((order => {
                return order.status === 'pending'
            }))

            tempData.sales.digit = totalSales
            tempData.orders.digit = orders.length
            tempData.paidOrders.digit = paidOrders.length
            tempData.unpaidOrders.digit = unpaidOrders.length
            tempData.products.digit = products.length
            tempData.users.digit = users.length

            return tempData;
        })
    }, [orders, products, users])

    //getting array of keys.............
    const summaryKeys = Object.keys(summaryData)
  return (
    <div className="max-w-[1150px] m-auto">
        <div className="mb-4 mt-8">
            <Heading title="Stats" center />
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {summaryKeys && summaryKeys.map((value) => {
                return <div key={value} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                    <div className="text-xl md:text-4xl font-bold">
                        {
                            summaryData[value].label === 'Total Sales' ?
                                <>{formatPrice(summaryData[value].digit)}</>
                            : 
                                <>{formatNumber(summaryData[value].digit)}</>
                        }
                    </div>
                    <div>{summaryData[value].label}</div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Summary