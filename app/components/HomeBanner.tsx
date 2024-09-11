import React from 'react'
import Container from './Container/Container'
import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div className='relative bg-gradient-to-tr from-sky-500 to-sky-700 border-b-[40px] border-white opacity-80 rounded-tr-2xl'>
        <div className='mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly'>
            <div className='mb-8 md:mb-0 text-center'>
                <h1 className='text-2xl md:text-6xl font-bold text-sky-700 mb-4'>
                    Summer Offer
                </h1>
                <p className='text-sm md:text-xl text-slate-200 mb-2'>
                    Enjoy discount on selected items...
                </p>
                <p className='text-xl md:text-5xl text-yellow-400 font-bold'>
                    GET 30% OFF
                </p>
            </div>
            <div className='w-1/3 relative aspect-video'>
                <Image 
                    src={'/banner-image.png'}
                    alt='banner image'
                    fill
                    className='object-contain'
                />
            </div>
        </div>
    </div>
  )
}

export default HomeBanner