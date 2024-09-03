import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

//POST request.......
export async function POST(request: Request) {
    //getiing the user...
    const currentUser = await getCurrentUser();

    //if no user/user is not admin....
    if(!currentUser || currentUser.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json();
    const {name, description, price, brand, category, inStock, images} = body;


    const product = await prisma.product.create({
        data: {
            name,
            description,
            category,
            brand,
            inStock,
            images,
            price: parseFloat(price)
        },
    });

    //taking product back to user....
    return NextResponse.json(product);
}


//PUT request..........
export async function PUT(request: Request) {
    //getting user.....
    const currentUser = await getCurrentUser();

    //validating the useer.....
    if(!currentUser || currentUser.role !== "ADMIN") {
        return NextResponse.error()
    }

    //getting the data........
    const body = await request.json();
    const {id, inStock} = body

    const product = await prisma.product.update({
        where: {id},
        data: {inStock}
    })

    return NextResponse.json(product)
}