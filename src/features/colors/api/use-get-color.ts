"use client"

import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

interface UseGetColorProps {
  colorId: string
}

export const useGetColor = ({ colorId }: UseGetColorProps) => {
  const query = useQuery({
    queryKey: ['colors', colorId],
    queryFn: async () => {
      const response = await client.api.colors[':colorId'].$get({ param: { colorId } })

      if (!response.ok) {
        throw new Error('get color failed...')
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
