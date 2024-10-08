"use client"

import { CartProductType, SelectedImage } from "@/app/product/[productId]/ProductDetails"
import Image from "next/image"

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleSelectedImage: (value: SelectedImage) => void
}

const ProductImage = ({cartProduct, product, handleSelectedImage}: ProductImageProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {product.images.map((image: SelectedImage) => {
                return <div 
                    key={image.color} 
                    onClick={() => handleSelectedImage(image)} 
                    className={`relative w-[80%] aspect-square rounded border-teal-300 ${cartProduct.selectedImage.color === image.color? 'border-[1.5px]' : 'border-none'}`}>
                    <Image 
                        src={image.image}
                        alt={image.color}
                        fill
                        className="object-contain"
                    />
                </div>
            })}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image 
                src={cartProduct.selectedImage.image}
                alt={cartProduct.name}
                fill
                className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
            />
        </div>
    </div>
  )
}

export default ProductImage