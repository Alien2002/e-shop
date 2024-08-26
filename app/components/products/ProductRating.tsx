export const productRating = (data: any) => {
    return data.reduce((acc:number, item:any) => {return item.rating + acc},0) / data.length
}