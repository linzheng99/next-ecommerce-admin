/* eslint-disable @typescript-eslint/no-explicit-any */

import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useGetColors } from "@/features/colors/api/use-get-colors"
import { useGetProduct } from "@/features/products/api/use-get-product"
import ProductSettings from "@/features/products/components/product-settings"
import { useGetSizes } from "@/features/sizes/api/use-get-sizes"

interface ProductIdClientProps {
  productId: string
  storeId: string
}

export function ProductIdClient({ productId, storeId }: ProductIdClientProps) {
  const { data: product, isLoading } = useGetProduct({ productId })
  const { data: colors, isLoading: isColorsLoading } = useGetColors({ storeId })
  const { data: sizes, isLoading: isSizesLoading } = useGetSizes({ storeId })
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategories({ storeId })

  if (isLoading || isColorsLoading || isSizesLoading || isCategoriesLoading) return <PageLoader />

  if (!product || !colors || !sizes || !categories) return <PageError />

  return (
    <div>
      <ProductSettings initialData={product as any} colors={colors} sizes={sizes} categories={categories} />
    </div>
  )
}
