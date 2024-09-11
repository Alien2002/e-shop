import getProducts from '@/actions/getProducts'
// import Summary from './Summary'
import getOrders from '@/actions/getOrders'
import getUsers from '@/actions/getUsers'
import Container from '../components/Container/Container'
// import BarGraph from './admin/manage-products/BarGraph'
import getGraphData from '@/actions/getGraphData'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '../components/NullData'

const Admin = async () => {
  const products = await getProducts({category: null})
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return <NullData title="Oops! Access Denied..." /> 
}

  return (
    <div className='pt-8'>
      <Container>
        hello
        {/* <Summary products={products} orders={orders} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px]'>
          <BarGraph data={graphData} />
        </div> */}
      </Container>
      
    </div>
  )
}

export default Admin