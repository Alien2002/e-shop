import Container from "@/app/components/Container/Container";
import ProductDetails from "./ProductDetails";
import RatingList from "@/app/components/products/RatingList";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Prisma from '@/libs/prismadb'
import AddRating from "./AddRating";



interface Iparams {
    productId?: string
}


export default async function productOne({params}: {params: Iparams}) {
  //getting current user.........
  const currentUser = await getCurrentUser()
  
  const product = await Prisma.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      reviews: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if(product) {
    return (
      <div>
        <Container> 

          <ProductDetails product={product} isUserLoggedIn={currentUser? true : false}/>
  
          <div className="flex flex-col gap-4 mt-20">
            <div>
              <AddRating product={product} user={currentUser} />
            </div>
            <div>
              <RatingList Product={product}/>
            </div>
          </div>
        </Container>
        
      </div>
    );
  }

  return null;
}
