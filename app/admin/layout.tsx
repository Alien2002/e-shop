import AdminNav from "../components/admin/AdminNav"

export const metadata = {
    title: 'E-shop Dashboard',
    description: 'E-shop Dashboard'
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout