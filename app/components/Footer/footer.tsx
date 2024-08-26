import React from 'react'
import Container from '../Container/Container'
import FooterList from './FooterList'
import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-300 text-sm mt-16'>
        <Container> 
            <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Shop Categories</h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Desktops</Link>
                    <Link href="#">Watches</Link>
                    <Link href="#">TVs</Link>
                    <Link href="#">Accessories</Link>
                </FooterList>     
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Customer Services</h3>
                    <Link href="#">Contact Me</Link>
                    <Link href="#">Shipping Policy</Link>
                    <Link href="#">Returns & Exchanges</Link>
                    <Link href="#">FAQs</Link>
                </FooterList>     
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>About ME</h3>
                    <p>
                        A dedicated website for E commercing...
                    </p>
                    <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
                </FooterList>     
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Follow ME</h3>
                    <div className='flex gap-2'>
                        <Link href="#"><MdFacebook size={24}/></Link>
                        <Link href="#"><BsInstagram size={24}/></Link>
                        <Link href="#"><BsTwitter size={24}/></Link>
                        <Link href="#"><BsYoutube size={24}/></Link>
                    </div>
                    
                </FooterList>     
            </div>
        </Container>
    </footer>
  )
}

export default Footer