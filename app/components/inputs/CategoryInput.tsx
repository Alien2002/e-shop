import { IconType } from "react-icons"

interface CategoryInputProps {
    selected?: boolean,
    label: string,
    icon: IconType,
    onclick: (value: string) => void
}

const CategoryInput = ({selected, label, icon: Icon, onclick}: CategoryInputProps) => {
  return (
    <div onClick={() => onclick(label)} 
        className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:scale-95 transition cursor-pointer
            ${selected? 'border-teal-400' : 'border-slate-200'}
            `}
    >
        <Icon size={30} />
        <div className="font-medium">{label}</div>
    </div>
  )
}

export default CategoryInput