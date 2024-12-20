"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

export const useGetStores = () => {
  const query = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await client.api.stores.$get()

      if (!response.ok) {
        throw new Error('get store failed...')
      }

      const data = await response.json()

      return data
    }
  })
  return query
}
