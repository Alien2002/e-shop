import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container/Container";
import ProductCard from "./components/products/ProductCard";
import Prisma from "@/libs/prismadb";
import { useSearchParams } from "next/navigation";
import getProducts, { ProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface ProductsProps {
  searchParams: ProductParams
}

export default async function Home({searchParams}: ProductsProps) {
  const products = await getProducts(searchParams)

  if(products?.length === 0) {
    return <NullData title="Oops! No product found. Click 'All' to clear filters." />
  }

  //fisher yates algorithm.........
  function shuffledArray(array: any) {
    for(let i = array.length - 1; i>0 ; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const shuffledProducts = shuffledArray(products)

  return (
    <div>
      <Container> 
        <div><HomeBanner /></div>
        {<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 md:gap-8">
          {shuffledProducts.map((prod: any) => {
            return <div key={prod?.id}>
              <ProductCard data={prod} />
            </div>
          })}
        </div>}
      </Container>
      
    </div>
  );
}
