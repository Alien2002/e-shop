import { IconType } from "react-icons"

interface AdminNavItemProps {
    selectedItem?: boolean,
    icon: IconType,
    label: string
}

const AdminNavItem = ({selectedItem, icon: Icon, label}: AdminNavItemProps) => {
  return (
    <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
        ${selectedItem? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}
    `}>
        <Icon size={20} />
        <div className="font-medium text-sm text-center break-normal">{label}</div>
    </div>
  )
}

export default AdminNavItem