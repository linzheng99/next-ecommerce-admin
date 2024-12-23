"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetBillboardProps {
  billboardId: string
}

export const useGetBillboard = ({ billboardId }: UseGetBillboardProps) => {
  const query = useQuery({
    queryKey: ['billboards', billboardId],
    queryFn: async () => {
      const response = await client.api.billboards[':billboardId'].$get({ param: { billboardId } })

      if (!response.ok) {
        throw new Error('get billboard failed...')
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
