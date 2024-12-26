import Billboard from "@/components/shop/billboard";
import Product from "@/components/shop/product";
import { getProducts } from "@/features/products/queries";

export default async function ShopPage() {
  const products = await getProducts({ storeId: process.env.STORE_ID! })

  return (
    <div className="flex flex-col">
      <Billboard />
      <Product products={products} title="Featured Products" />
    </div>
  )
}
