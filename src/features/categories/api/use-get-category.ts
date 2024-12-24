"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetCategoryProps {
  categoryId: string
}

export const useGetCategory = ({ categoryId }: UseGetCategoryProps) => {
  const query = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: async () => {
      const response = await client.api.categories[':categoryId'].$get({ param: { categoryId } })

      if (!response.ok) {
        throw new Error('get category failed...')
      }

      const data = await response.json()

      return {
        ...data,
        updatedAt: new Date(data.updatedAt),
        createdAt: new Date(data.createdAt),
      }
    }
  })
  return query
}
