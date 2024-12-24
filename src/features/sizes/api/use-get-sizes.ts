"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetSizesProps {
  storeId: string
}

export const useGetSizes = ({ storeId }: UseGetSizesProps) => {
  const query = useQuery({
    queryKey: ['sizes', storeId],
    queryFn: async () => {
      const response = await client.api.sizes.$get({ query: { storeId } })

      if (!response.ok) {
        throw new Error('get store failed...')
      }

      const data = await response.json()

      return data
    }
  })
  return query
}
