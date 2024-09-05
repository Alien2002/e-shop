'use client'

import { formatPrice } from "@/utilities/formatPrice"
import { Order,  User } from "@prisma/client"
import { DataGrid, GridColDef }  from '@mui/x-data-grid'
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import StatusButton from "@/app/components/StatusButton"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"

interface ManageOrdersClientProps {
  orders: ExtendedOrder[]
}

export type ExtendedOrder = Order & { user: User}

const ManageOrdersClient = ({orders}: ManageOrdersClientProps) => {

  const router = useRouter()

  let rows: any = []
  //checking for existance of products...
  if(orders) {
    // using material UI to construct the table.....
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      }
    })
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 180},
    {field: 'customer', headerName: 'Customer Name', width: 130},
    {field: 'amount', headerName: 'Amount(USD)', width: 130, renderCell: (params) => { 
      return <div className="font-bold text-slate-800">
        {params.row.amount}
      </div>
    }},
    {field: 'paymentStatus', headerName: 'Payment Status', width: 120, renderCell: (params) => {
        return <div className="relative pt-3 max-w-fit">
            {params.row.paymentStatus === 'pending'? 
                (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-teal-200" color="text-teal-700" />)  
            : params.row.paymentStatus === 'completed'? 
                (<Status text="completed" icon={MdDone} bg="bg-green-400" color="text-green-800" />)
            : <></>
            }
        </div>
    }},
    {field: 'deliveryStatus', headerName: 'Delivery Status', width: 120, renderCell: (params) => {
      return <div className="relative pt-3 max-w-fit">
        {params.row.deliveryStatus === 'pending'? 
          (<Status text="pending" icon={MdAccessTimeFilled} bg="bg-teal-200" color="text-teal-700" />)  
        : params.row.deliveryStatus === 'dispatched'? 
          (<Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />)
        : params.row.deliveryStatus === 'delivered'?
          (<Status text="delivered" icon={MdDone} bg="bg-green-400" color="text-green-800" />)
        : <></>
        }
      </div>
    }},
    {field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
      return <div className="flex justify-between w-full gap-4 pt-2">
        <StatusButton icon={MdDeliveryDining} onclick={() => {handleDisatched(params.row.id)}} />
        <StatusButton icon={MdDone} onclick={() => {handleDelivered(params.row.id)}} />
        <StatusButton icon={MdRemoveRedEye} onclick={() => {router.push(`/viewOrder/${params.row.id}`)}} />
      </div>
    }}

  ]
 
  
  const handleDisatched = useCallback((id: string) => {
    axios.put('/api/orders', {
      id,
      deliveryStatus: 'dispatched'
    }).then((res) => {
      toast.success('Order has been dispatched...')
      router.refresh()
    }).catch((error) => {
      toast.error('Oops! Something went wrong...')
      console.log('Error>>>>', error)
    })
  },[]) 
  
  const handleDelivered = useCallback((id: string) => {
    axios.put('/api/orders', {
      id,
      deliveryStatus: 'delivered'
    }).then((res) => {
      toast.success('Order has been delivered...')
      router.refresh()
    }).catch((error) => {
      toast.error('Oops! Something went wrong...')
      console.log('Error>>>>', error)
    })
  },[])


  
  
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
      <Heading title="Manage Orders" center />
      </div>
      <div style={{height: 600, width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: {page: 0, pageSize: 5} } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
            disableRowSelectionOnClick
          />
      </div>
    </div>
  )
}

export default ManageOrdersClient