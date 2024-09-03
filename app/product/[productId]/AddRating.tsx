'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import { safeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
    product: product & {reviews: Review[]}
    user: safeUser & {orders: Order[]} | null
}

const AddRating = ({product, user}: AddRatingProps) => {
    const[isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })
    
    const setCustomValue = (id:string, value:any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty:true,
            shouldValidate:true
        })
    }
    
    if(!user) {
        return null
    }
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        
        const ratingData = {
            ...data,
            userId: user.id,
            product: product
        }
        
        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Comment Submitted')
            router.refresh()
            reset
        }).catch((error) => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }
    
    if(!user || !product) return null;

    //checking if the user had already made an order once and it was delivered.........
    const deliveredOrder = user.orders.some(
        order => order.products.find(
            item => item.id === product.id
        ) 
        && 
        order.deliveryStatus === 'delivered'
    );

    //checking if the user had once created a review..........
    const userReview = product.reviews.find((review: Review) => {
        return review.userId === user.id
    })

    //returning error if user had created review before or he had not yet received the product before.....
    if(userReview || !deliveredOrder) {
        return null
    }

    return (
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Rate this product" />
            <Rating onChange={(event, newValue) =>{
                setCustomValue('rating', newValue)
            }} />
            <Input 
                id= 'comment'
                label= 'comment'
                disabled= {isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button label={isLoading? 'Loading...' : 'Add Rating'} onclick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default AddRating;