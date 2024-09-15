import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import Prisma from '@/libs/prismadb'

export async function POST(request: Request, params?: string) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        toast('You have to log in first...')
        return NextResponse.error()
    }

    const body = await request.json()
    const {comment, rating, prod, userId} = body

    //checking if the user had already made an order once and it was delivered.........
    const deliveredOrder = currentUser.orders.some(
        order => order.products.find(
            item => item.id === prod.id
        ) 
        &&
        order.deliveryStatus === 'delivered'
    );

    //checking if the user had once created a review..........
    const userReview = prod.reviews.find((review: Review) => {
        return review.userId === currentUser.id
    })

    //returning error if user had created review before or he had not yet received the product before.....
    if(userReview || !deliveredOrder) {
        return NextResponse.error()
    }

    //creating review
    const review = await Prisma.review.create({
        data: {
            comment,
            rating,
            productId: prod.id,
            userId,
        }
    })

    return NextResponse.json(review)
}