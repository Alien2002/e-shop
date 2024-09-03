import React from 'react'
import CreateOrder from './createOrder'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '../components/NullData'

const page = async () => {

  const currentUser = await getCurrentUser()
  if(!currentUser) {
    return <NullData title='Oops! You have to log in to continue...' />
  }
  return (
    <div>
        <CreateOrder currentUser={currentUser} />
    </div>
  )
}

export default page