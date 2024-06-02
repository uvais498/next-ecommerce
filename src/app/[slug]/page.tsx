import Add from "@/components/Add";
import CustomizeProducts from "@/components/customizeproducts";
import ProductImages from "@/components/productimages";
import { wixClientServer } from "@/lib/wixclientserver";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  console.log(product.variants)

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium ">{product.name}</h1>
        {/* <p className="text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
        <p
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description || ""),
          }}
        ></p>
        <div className="h-[2px] bg-gray-100" />

        {product.price?.discountedPrice === product.price?.price ? (
          <h2 className="font-medium text-2xl">{product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              {product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              {product.price?.discountedPrice}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />
        {
          product.variants && product.productOptions ?  (
            <CustomizeProducts
            productId={ product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
         />
          ) : (
            // <Add 
            //   productId = {product._id}
            //   variantId = { sele"00000000-0000-0000-0000-000000000000"}
            //   stockNumber = {product.stock?.quantity || 0} 
            //   />
            ""
          )
        }
        
        
        <div className="h-[2px] bg-gray-100" />

        {product.additionalInfoSections?.map((add: any, i: number) => (
          <div className="text-sm" key={i}>
            <h4 className="font-medium mb-4">{add.title}</h4>
            <p
              className="text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(add.description || ""),
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePage;
