import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.products[':productId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.products[':productId']['$patch']>

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.products[':productId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Product updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
