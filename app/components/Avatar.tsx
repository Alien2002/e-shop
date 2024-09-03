import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

interface AvatarProps {
    src?: string | null
}

const Avatar = ({src}: AvatarProps) => {
    if (src) {
        return (<Image 
            src={src}
            alt="avatar"
            className="rounded-full"
            height='30'
            width='30'
        />)
    }
  return (
    <FaUserCircle size={24}/>
  )
}

export default Avatar