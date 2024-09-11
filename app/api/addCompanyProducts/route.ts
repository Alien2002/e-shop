import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    //checking if user is logged in and has a company already registered
    if(!currentUser || !currentUser.company) {
        return NextResponse.error()
    }

    //retrieving the posted data
    const body = await request.json();
    const {name, description, price, brand, category, inStock, images} = body;

    //updating the company db by adding the product....
    const companyProduct = await Prisma.company.update({
        where: {
            id: currentUser.company.id
        },
        data: {
            product: {
                create: {
                    name,
                    description,
                    category,
                    brand,
                    inStock,
                    images,
                    price: parseFloat(price)
                }
            }
        }
    })

    return NextResponse.json(companyProduct)
}