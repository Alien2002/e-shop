"use client"

import { useCallback, useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/inputs/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import axios from "axios"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { userWithCompany } from '@/types'
import NullData from '../components/NullData'
import TextArea from '../components/inputs/TextArea'
import { categories } from '@/utilities/categories'
import CategoryInput from '../components/inputs/CategoryInput'
import { Company } from '@prisma/client'

interface CurrentUserProps {
    currentUser: userWithCompany | null
}

const RegisterForm = ({currentUser}: CurrentUserProps) => {
    const [isLoading, setisLoading] = useState(false)
    const [pcategories, setpCategories] = useState<string[]>()
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            companyName: '',
            productCategories: [],
            officeLocation: '',
            companyDescription: ''
        }})

    const router = useRouter()


    //managing product category selection.................
    const manageProductCategories = useCallback((value: string) => {
        setpCategories((prev) => {
            if(prev) {
                if(prev.includes(value)) {
                    const updatedProductCategories = prev.filter((item) => {return item !== value})
                    return updatedProductCategories
                }
                return [...prev, value]
            }
            return [value]
        })
    },[])

    
    useEffect(() => {
      if(!currentUser) return;
      if(currentUser.company) {
        router.push('/companyDashboard')
      }
    },[currentUser])
    
    
    const onsubmit: SubmitHandler<FieldValues> = (data) => {
      setisLoading(true)
      
      const updatedData = {...data, productCategories: pcategories}
      
      axios.post('./api/registerCompany', updatedData).then(() => {
        toast.success('Company registered...')
        router.refresh()
        reset()
      }).catch(
        () => toast.error("something went wrong!!!")
      ).finally(
        () => setisLoading(false)
      )
    }
    
    //checking if user is logged in and display a message instead of form...
    if(!currentUser) {
      return <NullData title='You have to log in first...' />
    }
    
    //if having a company prevent new registration.........
    if(currentUser.company) {
      return <>
        <NullData title='Already have a company...'
          paragraph={`${currentUser.company.companyName.toUpperCase()} is Registered under your email already.`}
          redirectMsg='Redirecting...'
          />
      </>
    }
    
    return (
      <>
        <Heading title='Register Your Company to E-shop' center/>
        <hr className='bg-slate-300 w-full'/>
        <p>Fill and submit the following form to register your company...</p>
        <Input 
            id='companyName'
            label='Company Name*'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        
        <div className="w-full font-medium">
          <div className="mb-2 font-semibold">Select types of products sold by your company*</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => {
              if(item.label === 'All') {
                return null
              }

              return <div key={item.label} className="col-span">
                <CategoryInput 
                  label = {item.label}
                  onclick={(item) => {manageProductCategories(item)}}
                  selected = {pcategories?.includes(item.label)}
                  icon={item.icon}
                />
              </div>
            })}
          </div>
      </div>


        <Input 
            id='officeLocation'
            label='Location of your Office*'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <TextArea 
            id="companyDescription"
            label="Short Description of the company*"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Button 
            label={isLoading? "Loading..." : "Register Company"}
            onclick={handleSubmit(onsubmit)}
        />

    </>
  )
}

export default RegisterForm