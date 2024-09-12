"use client";

import Container from '@/app/components/Container/Container'
import { productRating } from '@/app/components/products/ProductRating';
import { formatPrice } from '@/utilities/formatPrice';
import { Rating } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import SetColor from '@/app/components/products/setColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import Button from '@/app/components/Button';
import ProductImage from '@/app/components/products/ProductImage';
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { cartProductType, Company, Review } from '@prisma/client';

const Horizontal = () => {
    return <hr className='w-[30%] my-2' /> 
}

export type CartProductType = {
    id: string,
    companyId: string | null,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: SelectedImage,
    quantity: number,
    price: number
}

export type SelectedImage = {
    color: string,
    colorCode: string,
    image: string
}

interface ProductDetailsProps {
    product: any;
    company: Company | null;
    isUserLoggedIn: boolean;
}

const ProductDetails = ({product, company, isUserLoggedIn}: ProductDetailsProps) => {
    const {handleAddProductToCart, CartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setcartProduct] = useState<CartProductType>({
        id: product.id,
        companyId: product.companyId,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: {...product.images[0]},
        quantity: 1,
        price: product.price,
    })

    //routing variable
    const router = useRouter()

    useEffect(() => {
        setIsProductInCart(false)
        if(CartProducts) {
            const existingIndex = CartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [CartProducts])


    const HandleSelectedColor = useCallback((value: SelectedImage) => {
        setcartProduct((prev) => {
            return {...prev, selectedImage: value};
        })
    }, [ cartProduct.selectedImage])

    const HandleQuantityIncrease = useCallback(() => {
        setcartProduct((prev) => {
            if(prev.quantity === 99) return prev;
            return {...prev, quantity: prev.quantity + 1}
        })
    }, [ cartProduct ])
    const HandleQuantityDecrease = useCallback(() => {
        setcartProduct((prev) => {
            if(prev.quantity === 1) return prev;
            return {...prev, quantity: prev.quantity - 1}
        })
    }, [ cartProduct ])



  return (
    <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <div>
                <ProductImage 
                    cartProduct={cartProduct}
                    product={product}
                    handleSelectedImage={HandleSelectedColor}

                />
            </div>

            <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                <h1 className='text-3xl font-medium text-slate-700'>{product.name}</h1>
                <div className='font-bold text-2xl'>{formatPrice(product.price)}</div>
                <div className='flex items-center gap-2'>
                    <div> <Rating value={productRating(product.reviews)} readOnly /></div>
                    <div><p> { product.reviews.length } reviews</p></div>
                </div>
                <Horizontal />
                <div className='text-justify'>{product.description}</div>
                <Horizontal />
                <div>
                    {product.companyId?
                        <><span className='font-semibold'>COMPANY: </span>
                        <span>{company?.companyName.toUpperCase()}</span></>
                    : 
                        null}
                </div>
                <div>
                    <span className='font-semibold'>CATEGORY: </span>
                    <span>{product.category}</span>
                </div>
                <div>
                    <span className='font-semibold'>BRAND: </span>
                    <span>{product.brand}</span>
                </div>
                <div className={product.inStock? 'text-teal-400' : 'text-rose-400'}>
                    {product.inStock? "In stock" : "Out of stock"}
                </div>
                <Horizontal />

                {/*checking if product is in cart and displaying alternating views...*/}
                {(isProductInCart && isUserLoggedIn)? 
                    <div>
                        <p className='flex mb-2'>
                            <MdCheckCircle className='text-teal-400' size={20}/>
                            <span>Product added to Cart</span>
                        </p>
                        <div className='max-w-[400px]'>
                            <Button 
                                label='View Cart'
                                outline
                                onclick={() => router.push('/cart')}
                            />
                        </div>
                    </div> 
                : 
                    <div><SetColor
                        images={product.images}
                        cartProduct={cartProduct}
                        handleSelectedColor={HandleSelectedColor}
                    />
                    <Horizontal />
                    <SetQuantity 
                        cartProduct={cartProduct}
                        handleQuantityIncrease={HandleQuantityIncrease}
                        handleQuantityDecrease={HandleQuantityDecrease}
                    />
                    <Horizontal />
                        <div className='max-w-[400px]'>
                            <Button 
                                label='Add to Cart'
                                onclick={() => {handleAddProductToCart(cartProduct, isUserLoggedIn)}}
                            />
                        </div>
                    </div>
                }
                

            </div>
        </div>
    </Container>
  )
}

export default ProductDetails