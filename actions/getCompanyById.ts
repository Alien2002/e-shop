import Prisma from "@/libs/prismadb"


export default async function getCompanyById(companyId: string | null) {

    //if no company Id for the product return null....
    if(!companyId) {
        return null
    }

    try {
        
        const company = await Prisma.company.findUnique({
            where: {
                id: companyId
            }
        })

        if(!company) {
            return null
        }

        return company
    } catch (error: any) {
        throw new Error(error)
    }
}