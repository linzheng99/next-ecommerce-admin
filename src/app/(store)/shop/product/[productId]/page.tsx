import Product from '@/components/shop/product';
import ProductInfo from '@/components/shop/product-info';
import ProductTab from '@/components/shop/product-tab';
import { getProductById, getProducts } from "@/features/products/queries"

interface ProductIdPageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductIdPage({ params }: ProductIdPageProps) {
  const { productId } = await params

  const product = await getProductById({ productId })
  const relatedProducts = await getProducts({
    storeId: process.env.STORE_ID!,
    categoryId: product?.categoryId
  })

  return (
    <div className="flex flex-col p-4">
      <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 px-6 pt-4'>
        <ProductTab images={product?.images} />
        <ProductInfo product={product} />
      </div>
      <Product products={relatedProducts} title="Related Items" />
    </div>
  )
}
