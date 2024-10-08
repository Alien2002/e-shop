'use client'

import { useCallback, useState } from "react"
import Avatar from "../Avatar"
import { AiFillCaretDown } from "react-icons/ai"
import Link from "next/link"
import MenuItem from "./MenuItem"
import { signOut } from "next-auth/react"
import BackDrop from "./BackDrop"
import { safeUser, userWithCompany } from "@/types"
import { Company } from "@prisma/client"

interface CurrentUserProps {
    currentUser: userWithCompany | null
}

const UserMenu = ({currentUser}: CurrentUserProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen((prev) => !prev);
    },[])
    
  return (
    <div className="relative z-30">
        <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
            <Avatar src={currentUser?.image} />
            <AiFillCaretDown />
        </div>
        {/*setting the menus....*/}
        {isOpen && (
            <div className="z-20 absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                {currentUser? 
                    //if user is logged in show the following...
                    <div>
                        <Link href={"/orders"}>
                            <MenuItem onclick={toggleOpen}>Your orders</MenuItem>
                        </Link>
                        <Link href={"/admin"}>
                            <MenuItem onclick={toggleOpen}>Admin Dashboard</MenuItem>
                        </Link>
                        {currentUser.company? 
                            <Link href={'/companyDashboard'}>
                                <MenuItem onclick={toggleOpen}>Your Company</MenuItem>
                            </Link> 
                        : 
                            <Link href={'/registerCompany'}>
                                <MenuItem onclick={toggleOpen}>Register Company</MenuItem>
                            </Link>
                        }
                        
                        <hr />
                        <Link href={"/orders"}>
                            <MenuItem onclick={() => {
                                toggleOpen();
                                signOut();
                            }}>Logout</MenuItem>
                        </Link>
                    </div> 
                : 
                    //if user is not logged in show the following...
                    <div>
                        <Link href={"/login"}>
                            <MenuItem onclick={toggleOpen}>Login</MenuItem>
                        </Link>
                        <Link href={"/register"}>
                            <MenuItem onclick={toggleOpen}>Register</MenuItem>
                        </Link>
                    </div>
                }
                
                
            </div>
        )}
        {/* {showing the backdrop effect on menu pop....} */}
        {isOpen? <div><BackDrop onclick={toggleOpen} /></div> : null}
    </div>
  )
}

export default UserMenu