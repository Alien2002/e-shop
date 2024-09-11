import CompanyNav from "../components/company/CompanyNav"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "../components/NullData";

export const metadata = {
    title: 'E-shop Company Dashboard',
    description: 'E-shop Company Dashboard'
}

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return <NullData title="Oops! Access denied." />
  }
  return (
    <div>
        <CompanyNav currentUser={currentUser} />
        {children}
    </div>
  )
}

export default AdminLayout