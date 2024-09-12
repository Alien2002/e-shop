import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/app/components/Container/Container"
import NullData from "@/app/components/NullData"
import ManageOrdersClient from "./ManageOrdersClient"
import getOrders from "@/actions/getOrders"
import getCompanyById from "@/actions/getCompanyById"


const ManageOrders = async () => {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()
  
  
  //checking if user is admin
  if(!currentUser || !currentUser.company) {
    return <NullData title="Oops! Access denied..."/>
  }
  const company = await getCompanyById(currentUser?.company.id)
  return (
    <Container>
      <ManageOrdersClient orders={orders} company={company} />
    </Container>
  )
}

export default ManageOrders