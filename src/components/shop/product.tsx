import { getProducts } from "@/features/products/queries";

import ProductCard from "./product-card";

export default async function Product() {
  const products = await getProducts({ storeId: process.env.STORE_ID! })
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden space-y-4">
      <span className="text-2xl font-bold">
        Featured Products
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.filter((product) => product.images.length > 0).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
};
