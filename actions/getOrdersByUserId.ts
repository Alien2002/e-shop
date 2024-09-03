import Prisma from '@/libs/prismadb'

export default async function getOrdersByUserId(userId: string) {
    try {
        const orders = await Prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true
            },
            orderBy: {
                createdDate: 'desc'
            }
        })

        return orders;
    } catch (error: any) {
        throw new Error(error)
    }
}