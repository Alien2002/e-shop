import Link from "next/link"
import { CartProductType } from "../product/[productId]/ProductDetails"
import Image from "next/image"
import { TruncateText } from "@/utilities/truncateText"
import { formatPrice } from "@/utilities/formatPrice"
import SetQuantity from "../components/products/SetQuantity"
import { useCart } from "@/hooks/useCart"

interface ItemContentProps {
    item: CartProductType
}

const ItemContent = ({item}: ItemContentProps) => {
    const {handleRemoveItemFromCart, handleCartQuantityIncrease, handleCartQuantityDecrease} = useCart()
  return (
    <div className='grid grid-cols-5 text-[0.9rem] items-center gap-4 pb-2'>
        <div className=' flex col-span-2 justify-self-start gap-4'>
            <Link href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image 
                        src={item.selectedImage.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>{TruncateText(item.name)}</Link>
                <div>{item.selectedImage.color}</div>
                <div className="w-[70px]">
                    <button className="text-slate-500 underline" onClick={() => (handleRemoveItemFromCart(item))}>remove</button>
                </div>
            </div>
        </div>
        <div className='justify-self-center'>{formatPrice(item.price)}</div>
        <div className='justify-self-center'>
            <SetQuantity 
                cartCounter
                cartProduct={item}
                handleQuantityIncrease={() => {handleCartQuantityIncrease(item)}}
                handleQuantityDecrease={() => {handleCartQuantityDecrease(item)}}
            />
        </div>
        <div className='justify-self-end font-semibold'>{formatPrice(item.price * item.quantity)}</div>
        <hr  className="col-span-5" />
    </div>
  )
}

export default ItemContent