import { getCurrentUser } from "@/actions/getCurrentUser";
import Prisma from "@/libs/prismadb";
import { now } from "moment";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    const body = await request.json();
    const {companyName, productCategories, officeLocation, companyDescription} = body;

    //handling the error of user possibly being null...
    if(!currentUser) {
        return NextResponse.error()
    }

    const company = await Prisma.company.create({
        data: {
            companyName,
            productCategories,
            companyDescription,
            officeLocation,
            createdDate: new Date(),
            user: {
                connect: {
                    id: currentUser.id
                }
            }
        }
    })

    // //adding the company data to user database
    // await Prisma.user.update({
    //     where: {
    //         id: currentUser.id
    //     },
    //     data: {
    //         company: {
    //             create: {
    //                 id: company.id,
    //                 companyName,
    //                 companyDescription,
    //                 productCategories,
    //                 officeLocation,
    //                 createdDate: new Date()
    //             }
    //             }
    //         }
    //     })

    return NextResponse.json(company);
}
