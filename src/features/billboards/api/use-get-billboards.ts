"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetBillboardsProps {
  storeId: string
}

export const useGetBillboards = ({ storeId }: UseGetBillboardsProps) => {
  const query = useQuery({
    queryKey: ['billboards', storeId],
    queryFn: async () => {
      const response = await client.api.billboards.$get({ query: { storeId } })

      if (!response.ok) {
        throw new Error('get billboards failed...')
      }

      const data = await response.json()

      return data
    }
  })
  return query
}
