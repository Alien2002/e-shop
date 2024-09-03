import Container from "../components/Container/Container"
import FormWrap from "../components/FormWrap"
import CheckoutClient from "./CheckoutClient"


const page = () => {
  return (
    <div className="p-8">
        <Container>
            <FormWrap>
                <CheckoutClient />
            </FormWrap>
        </Container>
    </div>
  )
}

export default page