'use client'

import { CartContextProvider } from "@/hooks/useCart"

interface cartProviderProps {
    children: React.ReactNode
}



const cartProvider = ({children}: cartProviderProps) => {
  return (
    <CartContextProvider>
        {children}
    </CartContextProvider>
  )
}

export default cartProvider