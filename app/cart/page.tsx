import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../components/Container/Container"
import CartClient from "./cartClient"


const cart = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <CartClient isUserLoggedIn={currentUser? true : false} />
      </Container>

    </div>
  )
}

export default cart