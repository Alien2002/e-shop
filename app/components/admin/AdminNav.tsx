'use client'

import Link from "next/link"
import Container from "../Container/Container"
import AdminNavItem from "./AdminNavItem"
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md"
import { usePathname } from "next/navigation"

const AdminNav = () => {
    //capturing the path...
    const pathName = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
        <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                <Link href={'/admin'}>
                    <AdminNavItem 
                        label="summary"
                        icon={MdDashboard}
                        selectedItem={pathName === '/admin'}
                    />
                </Link>
                <Link href={'/admin/add-products'}>
                    <AdminNavItem 
                        label="AddProducts"
                        icon={MdLibraryAdd}
                        selectedItem={pathName === '/admin/add-products'}
                    />
                </Link>
                <Link href={'/admin/manage-products'}>
                    <AdminNavItem 
                        label="ManageProducts"
                        icon={MdDns}
                        selectedItem={pathName === '/admin/manage-products'}
                    />
                </Link>
                <Link href={'/admin/manage-orders'}>
                    <AdminNavItem 
                        label="ManageOrders"
                        icon={MdFormatListBulleted}
                        selectedItem={pathName === '/admin/manage-orders'}
                    />
                </Link>
            </div>
        </Container>
    </div>
  )
}

export default AdminNav