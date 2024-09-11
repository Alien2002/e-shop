import { IconType } from "react-icons"
import Heading from "../Heading"

interface CompanyNavItemProps {
    selectedItem?: boolean,
    icon: IconType,
    label: string
}

const CompanyNavItem = ({selectedItem, icon: Icon, label}: CompanyNavItemProps) => {
  return (
        <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
            ${selectedItem? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}
            `}>
            <Icon size={20} />
            <div className="font-medium text-sm text-center break-normal">{label}</div>
        </div>
  )
}

export default CompanyNavItem