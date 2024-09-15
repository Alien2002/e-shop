import Prisma from "@/libs/prismadb"

import { Iparams } from "@/app/product/[productId]/page";
import { NextResponse } from "next/server";

export default async function getProductById(params: Iparams) {
    if(!params) {
        return null
    }

    const product = await Prisma.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            reviews: true
        }
    })

    return product
}