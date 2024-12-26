"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetOrdersProps {
  storeId: string
}

export const useGetOrders = ({ storeId }: UseGetOrdersProps) => {
  const query = useQuery({
    queryKey: ['orders', storeId],
    queryFn: async () => {
      const response = await client.api.orders.$get({ query: { storeId } })

      if (!response.ok) {
        throw new Error('get store failed...')
      }

      const data = await response.json()

      return data.map((order) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }))
    }
  })
  return query
}
