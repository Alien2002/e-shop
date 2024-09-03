'use client'

import { useSearchParams } from "next/navigation"


export default function getParams(category: string, searchTerm?: string) {
    
const parameter = useSearchParams()?.get(category)
    if(parameter && parameter !== null){
        return ( parameter )
    }
    else return 'All'
}

export const getCategory = getParams('category')
