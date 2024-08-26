import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import { CartContextProvider } from "@/hooks/useCart";
import {Toaster} from 'react-hot-toast'
import { getCurrentUser } from "@/actions/getCurrentUser";


export const metadata: Metadata = {
  title: "E-shop",
  description: "Ecommerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="text-slate-700">
        <Toaster 
          toastOptions={{
            style: {
              background: 'rgb(51 65 85)',
              color: '#fff'
            }
          }}
        />
        <CartContextProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartContextProvider>
        
        
      </body>
    </html>
  );
}
