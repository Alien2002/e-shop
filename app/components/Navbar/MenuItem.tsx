interface MenuItemProps {
    children: React.ReactNode,
    onclick: () => void
}

const MenuItem = ({children, onclick}: MenuItemProps) => {
  return (
    <div onClick={onclick} className="px-4 py-3 hover:bg-neutral-100 transition bg-blue text-left">
        {children}
    </div>
  )
}

export default MenuItem