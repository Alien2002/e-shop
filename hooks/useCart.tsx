'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    CartTotalQuantity: number,
    cartItemsTotalCost: number,
    CartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType, isUserLoggedIn?: boolean) => void,
    handleRemoveItemFromCart: (product: CartProductType) => void,
    handleCartQuantityIncrease: (product: CartProductType) => void,
    handleCartQuantityDecrease: (product: CartProductType) => void,
    handleClearCart: (product: CartProductType[]) => void
}

interface Props {
    [PropsName: string]: any
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: Props) => {
    const [CartTotalQuantity, setCartTotalQuantity] = useState(0)
    const [CartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [cartItemsTotalCost, setcartItemsTotalCost] = useState(0)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState();

    //setting cart product at initial loading... 
    useEffect(() => {
        const cartItems: any = localStorage.getItem('EshopCartItems')
        const cProduct: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProduct)
    },[])

    // useEffect(() => {
    //     if(!isUserLoggedIn) {
    //         localStorage.setItem('EshopCartItems', JSON.stringify(null))
    //     }
    // },[isUserLoggedIn])

    //calculating subtotal cost of the products in the cart...
    useEffect(() =>{
        const ItemTotal = () => {
            if(CartProducts){
                const {total, qty} = CartProducts?.reduce((accumulator, item) => {
                    const itemTotal = item.quantity * item.price;
                    accumulator.total = accumulator.total + itemTotal
                    accumulator.qty = accumulator.qty + item.quantity
                    return accumulator
                }, {
                    total: 0,
                    qty: 0
                });
                setCartTotalQuantity(qty)
                setcartItemsTotalCost(total)
                
            }
            
        }

        ItemTotal()
    }, [CartProducts])

    //adding products to cart...
    const handleAddProductToCart = useCallback((product: CartProductType, isUserLoggedIn?: boolean)=>{
        if(!isUserLoggedIn) {
            return toast('You have to log in first...')
        }
        setCartProducts((prev) => {
            let updatedCart: CartProductType[];

            if(prev) {
                updatedCart = [...prev, product]
            }else {
                updatedCart = [product]
            }
            toast.success("Product added to cart...")
            localStorage.setItem('EshopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [])

    const handleRemoveItemFromCart = useCallback((product: CartProductType) => {
        if(CartProducts) {
            const filteredProducts = CartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)
            toast.success("Product removed from cart...")
            localStorage.setItem('EshopCartItems', JSON.stringify(filteredProducts))
        }
    }, [CartProducts])

    //hanlding increase quantity button in the cart page
    const handleCartQuantityIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 99) return toast.error("Ooops! maximum quantity reached...");

        if(CartProducts) {
            updatedCart = [...CartProducts]

            let existingIndex = CartProducts.findIndex((item) => {
                return item.id === product.id
            })

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1;
            }
            setCartProducts(updatedCart)
            localStorage.setItem('EshopCartItems', JSON.stringify(updatedCart))
        }

        
    }, [CartProducts])

    //handling decrease button in the cart page...
    const handleCartQuantityDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1) return toast.error("Ooops! minimum quantity reached...");

        if(CartProducts) {
            updatedCart = [...CartProducts]

            let existingIndex = CartProducts.findIndex((item) => {
                return item.id === product.id
            })

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1;
            }
            setCartProducts(updatedCart)
            localStorage.setItem('EshopCartItems', JSON.stringify(updatedCart))
        }

        
    }, [CartProducts])

    //handling clearance of cart items....removing all items in the cart...
    const handleClearCart = useCallback((product: CartProductType []) => {
        toast.error('Cart cleared...')
        setCartProducts(null)
        setCartTotalQuantity(0)
        localStorage.setItem('EshopCartItems', JSON.stringify(null))
    }, [CartProducts])

    

    const value = {
        CartTotalQuantity,
        CartProducts,
        handleAddProductToCart,
        handleRemoveItemFromCart,
        handleCartQuantityIncrease,
        handleCartQuantityDecrease,
        handleClearCart,
        cartItemsTotalCost
    }
    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context =useContext(CartContext)

    if(context === null)
        throw new Error("useCart must be used within a CartContextProvider")

    return context;
}