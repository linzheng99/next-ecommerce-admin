"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetSizeProps {
  sizeId: string
}

export const useGetSize = ({ sizeId }: UseGetSizeProps) => {
  const query = useQuery({
    queryKey: ['sizes', sizeId],
    queryFn: async () => {
      const response = await client.api.sizes[':sizeId'].$get({ param: { sizeId } })

      if (!response.ok) {
        throw new Error('get size failed...')
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
