'use client'

import Container from '../Container/Container'
import { categories } from '@/utilities/categories'
import Cartegory from './Cartegory'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const Cartegories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname();

    const isMainPage = pathname === '/'

    if(!isMainPage) return <div className='h-8 bg-white border-white'></div>


  return (
    <div className='bg-white '>
        <Container>
            <div className='pt-4 pb-4 flex flex-row items-center justify-between overflow-x-auto'>
                <Suspense fallback={<>Loading...</>}>
                    {categories.map((item) => (
                        <Cartegory 
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected= {category === item.label || (category === null && item.label === 'All')}
                        />
                    ))}
                </Suspense>
            </div>
        </Container>
    </div>
  )
}

export default Cartegories