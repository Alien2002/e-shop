import Image from "next/image";
import Navbar from "../components/Navbar/navbar";
import HomeBanner from "../components/HomeBanner";
import Container from "../components/Container/Container";
import { products } from "@/utilities/products";
import { TruncateText } from "@/utilities/truncateText";
import ProductCard from "../components/products/ProductCard";

export default function product() {
  return (
    <div>
      <Container> 
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 md:gap-8">
          <p>hello there</p>
        </div>
      </Container>
      
    </div>
  );
}
