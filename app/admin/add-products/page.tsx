import { getCurrentUser } from "@/actions/getCurrentUser";
import AddProductForm from "./AddProductForm"
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container/Container";
import FormWrap from "@/app/components/FormWrap";

const AddProducts = async () => {
  //getting user
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
      return <NullData title="Oops! Access Denied..." /> 
  }
  return (
    <div className="p-8">
        <Container>
            <FormWrap>
              <AddProductForm />
            </FormWrap>
        </Container>

    </div>
  )
}

export default AddProducts