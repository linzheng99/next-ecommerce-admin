"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetStoreProps {
  storeId: string
}

export const useGetStore = ({ storeId }: UseGetStoreProps) => {
  const query = useQuery({
    queryKey: ['stores', storeId],
    queryFn: async () => {
      const response = await client.api.stores[':storeId'].$get({ param: { storeId } })

      if (!response.ok) {
        throw new Error('get store failed...')
      }

      const data = await response.json()

      return data
    }
  })
  return query
}
