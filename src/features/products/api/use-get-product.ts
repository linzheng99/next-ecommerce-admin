"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetProductProps {
  productId: string
}

export const useGetProduct = ({ productId }: UseGetProductProps) => {
  const query = useQuery({
    queryKey: ['products', productId],
    queryFn: async () => {
      const response = await client.api.products[':productId'].$get({ param: { productId } })

      if (!response.ok) {
        throw new Error('get product failed...')
      }

      const data = await response.json()

      return {
        ...data,
        images: data.images.map((image) => ({
          ...image,
          createdAt: new Date(image.createdAt),
          updatedAt: new Date(image.updatedAt),
        })),
        updatedAt: new Date(data.updatedAt),
        createdAt: new Date(data.createdAt),
      }
    }
  })
  return query
}
