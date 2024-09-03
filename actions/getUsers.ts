import Prisma from '@/libs/prismadb'

export default async function getUsers() {
    try {
        const users = await Prisma.user.findMany()
        return users
    } catch (error: any) {
        throw new Error(error)
    }
}