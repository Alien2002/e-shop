import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import Heading from "../Heading"
import moment, { now } from 'moment'
import { Rating } from "@mui/material"
import Avatar from "../Avatar"

interface RatingListProps {
    Product: any
}

const RatingList = ({Product}: RatingListProps) => {
  return (
    <div>
        <Heading title="Product Review" />
        <div className="text-sm mt-2">
            {Product.reviews && Product.reviews.map((review: any) => {
                return (
                    <div key={review.id} >
                        <div className="flex gap-2 items-center">
                            <div>
                                <Avatar src={Product.review?.user.image}/>  
                            </div>
                            <div className="font-semibold">{review?.user.name}</div>
                            <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                        </div>
                        <div className="mt-2">
                            <Rating value={review.rating} readOnly />
                            <div>{review.comment}</div>
                            <hr className="mt-4 mb-4" />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default RatingList