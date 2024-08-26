import Container from "../components/Container/Container"
import CartClient from "./cartClient"


const cart = () => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>

    </div>
  )
}

export default cart