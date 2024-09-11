import React, { Suspense } from 'react'
import Link from 'next/link'
import Container from '../Container/Container'
import CartCounter from './CartCounter'
import UserMenu from './UserMenu'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Cartegories from './Cartegories'
import SearchBar from './SearchBar'
import Image from 'next/image'
import { FaShopify } from 'react-icons/fa'

const Navbar = async () => {

    const currentUser = await getCurrentUser();

  return (
    <div className='sticky top-0 w-full z-30 shadow-sm bg-gradient-to-tr from-slate-700 to-sky-700 items-center' >
        <div className="py-4 border-b-1px">
            <Container>
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <div className='font-serif font-bold h-7'><Link href={"/"}>
                        <FaShopify size={40} />
                    </Link></div>
                    <div className='hidden md:block'>
                        <SearchBar/>
                    </div>
                        <div className='md:hidden block items-center'>search</div>
                    <div className='flex items-center gap-8 md:gap-12'>
                        <div><CartCounter /></div>
                        <div className='text-right'><UserMenu currentUser={currentUser} /></div>
                    </div>
                </div>
                
            </Container>
        </div>
        <Suspense fallback={<>Loading...</>}>
            <Cartegories />
        </Suspense>
        
        
    </div>
  )
}

export default Navbar