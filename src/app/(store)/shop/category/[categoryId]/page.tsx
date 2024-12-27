import { getCategoryById } from "@/features/categories/queries"
import { getColors } from '@/features/colors/queries';
import { getSizes } from '@/features/sizes/queries';

import CategoryIdClient from "./client"

interface CategoryIdPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params
  const category = await getCategoryById({ categoryId })
  const sizes = await getSizes({ storeId: process.env.NEXT_PUBLIC_STORE_ID! })
  const colors = await getColors({ storeId: process.env.NEXT_PUBLIC_STORE_ID! })

  return <CategoryIdClient category={category} sizes={sizes} colors={colors} />
}
