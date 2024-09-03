import Prisma from '@/libs/prismadb'

export interface ProductParams {
    category?: string | null,
    searchTerm?: string | null
}

export default async function getProducts(params: ProductParams) {
    try {
        const {category, searchTerm} = params
        let searchString = searchTerm || ''


        let query: any = {}

        if(category) {
            query.category = category
        }

        const product = await Prisma?.product.findMany({
            where: {
                ...query,
                OR: [{
                    name: {
                        contains: searchString,
                        mode: 'insensitive'
                    }
                }]
            },
            include: {
                reviews: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if(product)
        return product
    
    } catch (error: any) {
        throw new Error(error)
    }
}