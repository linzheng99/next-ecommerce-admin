import Billboard from "@/components/shop/billboard";
import Product from "@/components/shop/product";
import { getBillboard } from "@/features/billboards/queries";
import { getProducts } from "@/features/products/queries";

export default async function ShopPage() {
  const products = await getProducts({ storeId: process.env.STORE_ID! })
  const billboard = await getBillboard({ 
    storeId: process.env.NEXT_PUBLIC_STORE_ID!, 
    billboardId: '598522f2-33bb-4d59-95ce-5917b82141a4' 
  })

  return (
    <div className="flex flex-col">
      <Billboard billboard={billboard} />
      <Product products={products} title="Featured Products" />
    </div>
  )
}
