//"use client"

import CategoryList from "@/components/Categorylist"
import ProductList from "@/components/productlist"
import Slider from "@/components/slider" 
import { useWixClient } from "@/hooks/useWixClient"
import { wixClientServer } from "@/lib/wixclientserver"
import { Suspense, useContext, useEffect } from "react"

const HomePage =  async() => {
  // const wixClient = useWixClient();

  // useEffect(()=>{
    
  //   const getProducts = async() => {
  //     try {
  //       const res = await wixClient.products.queryProducts().find();
  //       console.log(res);
  //     } catch (error) {
  //         console.log(error)
  //     }
  //   }
  //   getProducts();
  // },[wixClient])
  
  

  return (
    <div className=''>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback = {"loading"}>
          <ProductList 
              categoryId = {process.env.FEATURE_PRODUCT_CATEGORY_ID!} 
              limit = {4}
            />
        </Suspense>
      </div>

      <div className="mt-24 ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-10">
          Categories</h1>
        <Suspense fallback = {"loading"}>
        <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        {/* <ProductList categoryId="" /> */}
      </div>
    </div>
  )
}

export default HomePage