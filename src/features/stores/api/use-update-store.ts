import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.stores[':storeId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.stores[':storeId']['$patch']>

export const useUpdateStore = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.stores[':storeId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to update store')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Store updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['stores'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
