"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetOrderProps {
  orderId: string
}

export const useGetOrder = ({ orderId }: UseGetOrderProps) => {
  const query = useQuery({
    queryKey: ['orders', orderId],
    queryFn: async () => {
      const response = await client.api.orders[':orderId'].$get({ param: { orderId } })

      if (!response.ok) {
        throw new Error('get order failed...')
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
