"use client"

import { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Link from 'next/link'
import {AiOutlineGoogle} from 'react-icons/ai'
import axios from "axios"
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { safeUser } from '@/types'

interface CurrentUserProps {
    currentUser: safeUser
}

const RegisterForm = ({currentUser}: CurrentUserProps) => {
    const [isLoading, setisLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }})

    const router = useRouter();

    //redirecting if the user has logged in already...
    useEffect(() => {
        if(currentUser) {
            router.push("/")
            router.refresh()
        }
    }, [])

    //checking if user is logged in and display a message instead of form...
    if(currentUser) {
        return <div className='text-center'>
            <p>Already logged in as {currentUser.name}</p>
            <p>Redirecting...</p>
        </div>
    }

    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true)
        
        axios.post('./api/register', data).then(() => {
            toast.success('Account successfully created...')

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if(callback?.ok) {
                    router.push('/cart')
                    router.refresh()
                    toast.success("Logged In");
                    
                }

                if(callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(
            () => toast.error("something went wrong!!!")
        ).finally(
                () => setisLoading(false)
            )
    }
  return (
    <>
        <Heading title='SignUp to E-shop' center/>
        <Button 
            label='Sign Up with Google'
            outline
            buttonIcon={AiOutlineGoogle}
            onclick={() => {}}
        />
        <hr className='bg-slate-300 w-full'/>
        <Input 
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
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
            label={isLoading? "Loading..." : "Sign Up"}
            onclick={handleSubmit(onsubmit)}
        />

        {/*a link to login page...*/}
        <p className='text-sm'>Already have account? <Link className='underline' href={'/login'}>Login</Link></p>
    </>
  )
}

export default RegisterForm