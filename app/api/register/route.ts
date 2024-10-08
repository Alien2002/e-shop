import bcrypt from "bcryptjs"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json();
    const {name, email, password, company} = body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            company
        },
    });

    return NextResponse.json(user);
}