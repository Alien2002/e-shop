import Container from "@/app/components/Container/Container";
import ProductDetails from "./ProductDetails";
import RatingList from "@/app/components/products/RatingList";
import { products } from "@/utilities/products";



interface Iparams {
    productId?: string
}

export default function productOne({params}: {params: Iparams}) {
  const product = products.find((item) => {
    return item.id === params.productId;
  })
  return (
    <div>
      <Container> 

        <ProductDetails product={product}/>

        <div className="flex flex-col gap-4 mt-20">
          <div>add rating</div>
          <div>
            <RatingList Product={products[3]}/>
          </div>
        </div>
      </Container>
      
    </div>
  );
}
