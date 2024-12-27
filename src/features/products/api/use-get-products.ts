"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetProductsProps {
  storeId: string
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const useGetProducts = ({ storeId, categoryId, colorId, sizeId, isFeatured }: UseGetProductsProps) => {
  const query = useQuery({
    queryKey: ['products', storeId, categoryId, colorId, sizeId, isFeatured],
    queryFn: async () => {
      const response = await client.api.products.$get({ query: { storeId, categoryId, colorId, sizeId  } })

      if (!response.ok) {
        throw new Error('get products failed...')
      }

      const data = await response.json()

      const products = data.map((product) => ({
        ...product,
        images: product.images.map((image) => ({
          ...image,
          createdAt: new Date(image.createdAt),
          updatedAt: new Date(image.updatedAt),
        })),
        category: {
          ...product.category,
          createdAt: new Date(product.category.createdAt),
          updatedAt: new Date(product.category.updatedAt),
        },
        color: {
          ...product.color,
          createdAt: new Date(product.color.createdAt),
          updatedAt: new Date(product.color.updatedAt),
        },
        size: {
          ...product.size,
          createdAt: new Date(product.size.createdAt),
          updatedAt: new Date(product.size.updatedAt),
        },
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      }))

      return products
    }
  })
  return query
}
