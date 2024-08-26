"use client"

import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import {AiOutlineGoogle} from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { safeUser } from '@/types'

interface CurrentUserProps {
    currentUser: safeUser
}

const LoginForm = ({currentUser}: CurrentUserProps) => {
    const [isLoading, setisLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }})

        const router = useRouter()

        //redirecting if the user has logged in already...
        useEffect(() => {
            if(currentUser) {
                router.push("/")
                router.refresh()
            }
        },[])


        //checking if the user is already logged...
        if(currentUser) {
            return <div>Already logged in. Redirecting...</div>
        }


        const onsubmit: SubmitHandler<FieldValues> = (data) => {
            setisLoading(true)

            signIn('credentials', {
                ...data,
                redirect:false,
            }).then((callback) => {

                //checking if login was successful...
                if(callback?.ok) {
                    router.push('/cart')
                    router.refresh()
                    toast.success('Logged In')
                }

                //if the login is unsuccessful...
                if(callback?.error) {
                    toast.error(callback.error)
                }
            }).finally(() => {setisLoading(false)})
        }
  return (
    <>
        <Heading title='Sign In to E-shop' center/>
        <Button 
            label='Continue with Google'
            outline
            buttonIcon={AiOutlineGoogle}
            onclick={() => {signIn('google')}}
        />
        <hr className='bg-slate-300 w-full'/>
        <Input 
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type='password'
        />
        <Button 
            label={isLoading? "Loading..." : "Login"}
            onclick={handleSubmit(onsubmit)}
        />

        {/*a link to login page...*/}
        <p className='text-sm'>Do not have account? <Link className='underline' href={'/register'}>Sign Up</Link></p>
    </>
  )
}

export default LoginForm