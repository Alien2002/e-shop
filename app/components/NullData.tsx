interface NullData {
    title: string,
    paragraph?: string,
    redirectMsg?: string
}
const NullData = ({title, paragraph, redirectMsg}: NullData) => {
  return (<>
    <div className="w-full h-[20vh] flex items-center justify-center text-xl md:text-2xl">
        <p className="font-medium">{title}</p>
    </div>
    <p className="text-center relative">{paragraph}</p>
    <p className="text-center">{redirectMsg}</p>
    </>
  )
}

export default NullData