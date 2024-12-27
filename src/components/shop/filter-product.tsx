'use client'

import { Loader } from "lucide-react"
import { useEffect, useState } from "react";

import { useGetProducts } from "@/features/products/api/use-get-products"
import { useCategoryFilter } from "@/store/use-category-filter"

import Product from './product';

interface FilterProductProps {
  categoryId: string | undefined
}

export default function FilterProduct({ categoryId }: FilterProductProps) {
  const [isMounted, setIsMounted] = useState(false)

  const { values } = useCategoryFilter()

  const { data, isLoading } = useGetProducts({
    storeId: process.env.NEXT_PUBLIC_STORE_ID!,
    categoryId: categoryId,
    isFeatured: true,
    sizeId: values.sizeId,
    colorId: values.colorId,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null


  if (isLoading) return (
    <div className="w-full min-h-[200px] flex justify-center items-center">
      <Loader className="animate-spin size-4" />
    </div>
  )

  if (!data) return null

  return (
    <Product products={data} />
  )
}

