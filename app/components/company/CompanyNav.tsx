'use client'

import Link from "next/link"
import Container from "../Container/Container"
import CompanyNavItem from "./CompanyNavItem"
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md"
import { usePathname } from "next/navigation"
import Heading from "../Heading"
import { safeUser } from "@/types"
import { Company } from "@prisma/client"

interface currentUserProps {
    currentUser: safeUser & {company: Company | null}
}

const CompanyNav = ({currentUser}: currentUserProps) => {
    //capturing the path...
    const pathName = usePathname();
  return (
    <div>
        <h3> Welcome to <span className="font-semibold">{currentUser.company?.companyName.toUpperCase()}</span> </h3>
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href={'/companyDashboard'}>
                        <CompanyNavItem 
                            label="summary..."
                            icon={MdDashboard}
                            selectedItem={pathName === '/admin'}
                        />
                    </Link>
                    <Link href={'/companyDashboard/add-products'}>
                        <CompanyNavItem 
                            label="AddProducts"
                            icon={MdLibraryAdd}
                            selectedItem={pathName === '/admin/add-products'}
                        />
                    </Link>
                    <Link href={'/companyDashboard/manage-products'}>
                        <CompanyNavItem 
                            label="ManageProducts"
                            icon={MdDns}
                            selectedItem={pathName === '/admin/manage-products'}
                        />
                    </Link>
                    <Link href={'/companyDashboard/manage-orders'}>
                        <CompanyNavItem 
                            label="ManageOrders"
                            icon={MdFormatListBulleted}
                            selectedItem={pathName === '/admin/manage-orders'}
                        />
                    </Link>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default CompanyNav