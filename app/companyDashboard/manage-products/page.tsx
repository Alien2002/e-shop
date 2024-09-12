import { getCurrentUser } from "@/actions/getCurrentUser"
import getProducts from "@/actions/getProducts"
import Container from "@/app/components/Container/Container"
import NullData from "@/app/components/NullData"
import ManageProductsClient from "./ManageProductsClient"


const ManageProducts = async () => {
  const product = await getProducts({category: null})
  const currentUser = await getCurrentUser()

  //checking if user is logged in
  if(!currentUser) {
    return <NullData title="Oops! Access denied..."/>
  }

  //filtering products to get products posted by the current user only...
  const companyProducts = product?.filter((item) => {
    if(currentUser.company) {
      return item.companyId === currentUser.company.id
    }
    return false
  })

  return (
    <Container>
      <ManageProductsClient product={companyProducts} />
    </Container>
  )
}

export default ManageProducts