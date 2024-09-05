import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser()

    //checking if the user is an admin...............
    if(!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }
    const body = await request.json()
    const {id, deliveryStatus} = body

    const updatedProduct = await prisma?.order.update({
        where: {
            id: id
        },
        data: {
            deliveryStatus
        }
    })

    return NextResponse.json(updatedProduct)
}