import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.products[':productId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.products[':productId']['$delete']>

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.products[':productId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Product deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
