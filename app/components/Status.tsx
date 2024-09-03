import { IconType } from "react-icons"

//managing the action column in manage product table...........
interface StatusProps {
    text: string,
    icon: IconType,
    bg: string,
    color: string
}

const Status = ({text, icon: Icon, bg, color}: StatusProps) => {
  return (
    <div className={`relative h-6 text-[12px] ${bg} ${color} px-1 rounded flex items-center gap-1`}>
        {text} <Icon size={15} />
    </div>
  )
}

export default Status