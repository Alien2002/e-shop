import React from 'react'
import Link from 'next/link'
import Container from '../Container/Container'
import CartCounter from './CartCounter'
import UserMenu from './UserMenu'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Navbar = async () => {

    const currentUser = await getCurrentUser();

  return (
    <div className='sticky top-0 w-full z-30 shadow-sm bg-slate-300 items-center border-b-[40px] border-white' >
        <div className="py-4 border-b-1px">
            <Container>
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <div className='font-serif font-bold'><Link href={"/"}>E-shop</Link></div>
                    <div className='hidden md:block'>search</div>
                    <div className='flex items-center gap-8 md:gap-12'>
                        <div><CartCounter /></div>
                        <div className='text-right'><UserMenu currentUser={currentUser} /></div>
                    </div>
                </div>
                
            </Container>
        </div>
        
        
    </div>
  )
}

export default Navbar