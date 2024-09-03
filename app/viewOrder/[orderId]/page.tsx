import Container from "@/app/components/Container/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Prisma from "@/libs/prismadb"
import getOrderById from "@/actions/getOrderById";
import OrderDetails from "./OrderDetails";



interface Iparams {
    orderId?: string
}



export default async function order({params}: {params: Iparams}) {
  //getting current user.........
  const currentUser = await getCurrentUser()

  
    //getting orders from the database......
    const order = await getOrderById(params)
    
  if(order) {
    return (
      <div>
        <Container> 

          <OrderDetails order={order} />
  
        </Container>
        
      </div>
    );
  }

  return null;
}
