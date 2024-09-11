'use server'

import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../components/Container/Container"
import FormWrap from "../components/FormWrap"
import LoginForm from "./CompanyLoginForm"


const page = async () => {

  const currentUser = await getCurrentUser();

  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser} />
        </FormWrap>
    </Container>
  )
}

export default page