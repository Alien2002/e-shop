import { getCurrentUser } from "@/actions/getCurrentUser"
import getProducts from "@/actions/getProducts"
import Container from "@/app/components/Container/Container"
import NullData from "@/app/components/NullData"
import ManageProductsClient from "./ManageProductsClient"


const ManageProducts = async () => {
  const product = await getProducts({category: null})
  const currentUser = await getCurrentUser()

  //checking if user is admin
  if(!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Access denied..."/>
  }
  return (
    <Container>
      <ManageProductsClient product={product} />
    </Container>
  )
}

export default ManageProducts