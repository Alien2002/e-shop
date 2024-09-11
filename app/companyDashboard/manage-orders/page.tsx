import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/app/components/Container/Container"
import NullData from "@/app/components/NullData"
import ManageOrdersClient from "./ManageOrdersClient"
import getOrders from "@/actions/getOrders"


const ManageOrders = async () => {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  //checking if user is admin
  if(!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Access denied..."/>
  }
  return (
    <Container>
      <ManageOrdersClient orders={orders} />
    </Container>
  )
}

export default ManageOrders