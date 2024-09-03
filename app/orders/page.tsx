import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/app/components/Container/Container"
import NullData from "@/app/components/NullData"

import OrdersClient from "./OrdersClient"
import getOrdersByUserId from "@/actions/getOrdersByUserId"


const Orders = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return <NullData title="Oops! Access denied..." />
    }

    const orders = await getOrdersByUserId(currentUser.id)

  return (
    <Container>
        <OrdersClient orders={orders}/>
    </Container>
  )
}

export default Orders