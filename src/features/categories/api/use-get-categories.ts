"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetCategoriesProps {
  storeId: string
  sizeId?: string
  colorId?: string
}

export const useGetCategories = ({ storeId, sizeId, colorId }: UseGetCategoriesProps) => {
  const query = useQuery({
    queryKey: ['categories', storeId, sizeId, colorId],
    queryFn: async () => {
      const response = await client.api.categories.$get({ query: { storeId, sizeId, colorId } })

      if (!response.ok) {
        throw new Error('get store failed...')
      }

      // 转换billboard 中的创建时间和更新时间里面的时间为Date格式  
      const data = await response.json()
      const categories = data.map((category) => ({
        ...category,
        billboard: {
          ...category.billboard,
          createdAt: new Date(category.billboard.createdAt),
          updatedAt: new Date(category.billboard.updatedAt),
        },
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
      }))

      return categories
    }
  })
  return query
}
