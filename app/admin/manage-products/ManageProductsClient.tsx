'use client'

import { formatPrice } from "@/utilities/formatPrice"
import { product, Review } from "@prisma/client"
import { DataGrid, GridColDef }  from '@mui/x-data-grid'
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md"
import StatusButton from "@/app/components/StatusButton"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/libs/firebase"

export type ManageProductsType = product & {
  reviews: Review[]
}

interface ManageProductsClientProps {
  product: ManageProductsType[] | undefined |null
}

const ManageProductsClient = ({product}: ManageProductsClientProps) => {

  const router = useRouter()
  const storage = getStorage(firebaseApp)

  let rows: any = []
  //checking for existance of products...
  if(product) {
    // using material UI to construct the table.....
    rows = product.map((prod) => {
      return {
        id: prod.id,
        name: prod.name,
        price: formatPrice(prod.price),
        category: prod.category,
        brand: prod.brand,
        inStock: prod.inStock,
        images: prod.images
      }
    })
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 220},
    {field: 'name', headerName: 'Name', width: 220},
    {field: 'price', headerName: 'Price(USD)', width: 100, renderCell: (params) => { 
      return <div className="font-bold text-slate-800">
        {params.row.price}
      </div>
    }},
    {field: 'category', headerName: 'Category', width: 100},
    {field: 'brand', headerName: 'Brand', width: 100},
    {field: 'inStock', headerName: 'InStock', width: 120, renderCell: (params) => {
      return <div className="relative pt-3 max-w-fit">
        {params.row.inStock === true? 
          (<Status text="In stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" />)  
        : 
          (<Status text="Out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />)
        }
      </div>
    }},
    {field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
      return <div className="flex justify-between w-full gap-4 pt-2">
        <StatusButton icon={MdCached} onclick={() => {handleInStockStatus(params.row.id, params.row.inStock)}} />
        <StatusButton icon={MdDelete} onclick={() => {handleDeleteProduct(params.row.id, params.row.images)}} />
        <StatusButton icon={MdRemoveRedEye} onclick={() => {router.push(`/product/${params.row.id}`)}} />
      </div>
    }}

  ]
 
  //changing in stock status function including manipulating data in database...........
  const handleInStockStatus = useCallback((id: string, inStock: boolean,) => {
    axios.put('/api/product', {
      id,
      inStock: !inStock
    }).then((res) => {
      toast.success('Product Status Updated...')
      router.refresh()
    }).catch((error) => {
      toast.error('Oops! Something went wrong...')
      console.log('Error>>>>', error)
    })
  },[])


  //handling the delete product event...........
  const handleDeleteProduct = useCallback(async (id: string, images: any[]) => {
    toast('Deleting product. Please wait...')

    //first deleting images............
    const handleProductImagesDelete = async () => {
      try {
        for(const item of images) {
          if(item.image) {
            const imageRef = ref(storage, item.image)
            await deleteObject(imageRef)
            console.log('Image deleted...')
          }
        }
      } catch (error) {
        toast.error('Error while deleting image.')
        console.log('Error>>>>', error)
      }
    }
    await handleProductImagesDelete()

    //now deleting product from database........
    axios.delete(`/api/product/${id}`).then(() => {
      toast.success('Product deleted.')
      router.refresh()
    }).catch((err) => {
      toast.error('Error while deleting product from database')
      console.log('Error...', err)
    })

  },[])
  
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
      <Heading title="Manage Products" center />
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

export default ManageProductsClient