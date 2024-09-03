"use client"

import { formatPrice } from "@/utilities/formatPrice"
import { TruncateText } from "@/utilities/truncateText"
import { Rating } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { productRating } from "./ProductRating"
import { product, Review } from "@prisma/client"
import NullData from "../NullData"

interface ProductCardProps {
    data: ProductType
}

export type ProductType = {reviews: Review[]} & product | null

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    const routing = useRouter();

    if(!data){
        return <NullData 
            title="Oops! No product in this category yet..."
        />
    }
    //const productRating = data.reviews.reduce((acc:number, item:any) => {return item.rating + acc},0) / data.reviews.length

  return (
    <div onClick={() => routing.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
        <div className="flex flex-col items-center w-full gap-1">
            <div className="aspect-square overflow-hidden relative w-full">
                {data.images.map((img) => {
                    return <Image 
                        key={img.color}
                        src={img.image}
                        alt={data.name}
                        fill
                        className="w-full h-full object-contain"
                    />
                })}
            </div>
            <div className="text-slate-500 mt-4">
                <p>{TruncateText(data.name)}</p>
            </div>
            <div> <Rating value={productRating(data.reviews)} readOnly/></div>
            <div className="text-slate-500">
                <p>{data.reviews.length} Reviews</p>
            </div>
            <div className="font-bold text-slate-700">
                <p>{formatPrice(data.price)}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard