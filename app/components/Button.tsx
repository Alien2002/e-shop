"use client"

import { IconBase, IconBaseProps } from "react-icons"

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    buttonIcon?: React.ElementType,
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({label, disabled, outline, small, custom, buttonIcon: Icon, onclick}: ButtonProps) => {
  return (
    <button
        onClick={onclick}
        disabled = {disabled}
        className={`disabled:opacity-[70%] disabled:cursor-not-allowed rounded-md hover:opacity-[80%] transition w-full border-slate-700 flex items-center justify-center gap-2
            ${outline? 'bg-white text-slate-700' : 'bg-slate-700 text-white'}
            ${small? 'text-sm font-light py-1 px-2 border-[1px]' : 'text-md font-semibold py-3 px-4 border-[2px]'}
            ${custom? custom : ''}
            `}
    >
        {Icon && <Icon />}
        {label}
    </button>
  )
}

export default Button