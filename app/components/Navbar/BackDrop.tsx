interface BackDropProps {
    onclick: () => void
}

const BackDrop = ({onclick}: BackDropProps) => {
  return (
    <div 
        onClick={onclick}
        className="z-10 bg-white opacity-50 w-screen h-screen fixed top-0 left-0"
        >
        
    </div>
  )
}

export default BackDrop