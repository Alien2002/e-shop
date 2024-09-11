"use client"

import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { safeUser, userWithCompany } from '@/types'
import NullData from '../components/NullData'
import axios from 'axios'

interface CurrentUserProps {
    currentUser: userWithCompany
}

const LoginForm = ({currentUser}: CurrentUserProps) => {
    const [isLoading, setisLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            companyName: ''
        }})

        const router = useRouter()


        //If user already has an account redirect to login page......
        useEffect(() => {
            if(currentUser?.company) {
                router.push('/loginToCompany')
                router.refresh()
            }
        }, [])      
        if(currentUser?.company) {
            return<>
                <NullData title='Already registered a company. Redirecting to company Login page' />
            </>
        }

        //checking if the user is already logged...
        if(!currentUser) {
            return <NullData title='Oops! Access denied... you have to login first'/>
        }


        const onsubmit: SubmitHandler<FieldValues> = (data) => {
            setisLoading(true)

            axios.get('./api/loginToCompany', data)
            .catch((error:any) => {
                throw new Error(error)
            })
            .finally(() => {setisLoading(false)})
        }
  return (
    <>
        <Heading title='Login to your E-shop Company' center/>
        <hr className='bg-slate-300 w-full'/>
        <Input 
            id='email'
            label='Enter Your Email Address'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id='companyName'
            label='Enter Your Company Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Button 
            label={isLoading? "Loading..." : "Login"}
            onclick={handleSubmit(onsubmit)}
        />

        {/*a link to login page...*/}
        <p className='text-sm'> <Link className='underline' href={'/register'}>Register your company</Link></p>
    </>
  )
}

export default LoginForm