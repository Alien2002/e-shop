'use server'

import React from 'react'
import Container from '../components/Container/Container'
import FormWrap from '../components/FormWrap'
import RegisterCompanyForm from './RegisterCompanyForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Register = async () => {

  const currentUser = await getCurrentUser()


  return (
    <Container>
        <FormWrap>
            <RegisterCompanyForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default Register