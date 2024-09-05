import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Prisma from "@/libs/prismadb"

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }

    const product = await Prisma?.product.delete({
        where: {id: params.id}
    })

    return NextResponse.json(product)
}