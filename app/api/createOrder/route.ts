import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    //getting the user..........
    const currentUser = await getCurrentUser()

    //checking if user is logged in...............
    if(!currentUser || !currentUser.id) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {userId, amount, status, deliveryAddress: {region, line1, district, street}, deliveryStatus, createdDate, products} = body

    const addedOrder = await prisma?.order.create({
        data: {
            userId,
            amount,
            status,
            deliveryAddress: {
            region,
            line1,
            district,
            street
            },
            deliveryStatus,
            products,
            createdDate
        },
    })

    console.log (addedOrder)

    return NextResponse.json(addedOrder)
}


//to be continued..............