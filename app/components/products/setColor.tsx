"use client"

import { CartProductType, SelectedImage } from "@/app/product/[productId]/ProductDetails"

interface setColorProps {
    images: SelectedImage[],
    cartProduct: CartProductType,
    handleSelectedColor: (value: SelectedImage) => void
}

const SetColor= ( {images, cartProduct, handleSelectedColor}: setColorProps ) => {
  return (
    <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR</span>
        <div className="flex gap-1">
            {
                images.map((images) => {
                    return <div className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct.selectedImage.color === images.color? 'border-[1.5px]' : 'border-none'}`}>
                        <div
                            key={images.color}
                            onClick={() => handleSelectedColor(images)}
                            style={{background: images.colorCode}}
                            className="w-5 h-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                        ></div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default SetColor