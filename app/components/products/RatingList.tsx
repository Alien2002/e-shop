import { CartProductType } from "@/app/product/[productId]/ProductDetails"
import Heading from "../Heading"
import moment, { now } from 'moment'
import { Rating } from "@mui/material"
import Avatar from "../Avatar"
import { ProductType } from "./ProductCard"
import { Review } from "@prisma/client"
import prisma from '@/libs/prismadb'

interface RatingListProps {
    Product: ProductType
}

//getting avatar of user who posted a review..............
const avatar = async (usr: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: usr
        }
    })
    if(user) {
        return user.name
    }
    return null
}


const RatingList = ({Product}: RatingListProps) => {
    if(Product) {
        if(Product.reviews.length === 0) {
            return null
        }
        return (
          <div>
              <Heading title="Product Review" />
              <div className="text-sm mt-2">
                  {Product.reviews && Product.reviews.map((review: Review) => {
                      return (
                          <div key={review.id} >
                              <div className="flex gap-2 items-center">
                                  <div>
                                      <Avatar />  
                                  </div>
                                  <div className="font-semibold">{avatar(review.userId)}</div>
                                  <div className="font-light">{moment(review.createdAt).fromNow()}</div>
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
    return null
}

export default RatingList