"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetColorsProps {
  storeId: string
}

export const useGetColors = ({ storeId }: UseGetColorsProps) => {
  const query = useQuery({
    queryKey: ['colors', storeId],
    queryFn: async () => {
      const response = await client.api.colors.$get({ query: { storeId } })

      if (!response.ok) {
        throw new Error('get colors failed...')
      }

      const data = await response.json()

      return data.map((color) => ({
        ...color,
        createdAt: new Date(color.createdAt),
        updatedAt: new Date(color.updatedAt),
      }))
    }
  })
  return query
}
