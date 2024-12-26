import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.orders[':orderId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.orders[':orderId']['$delete']>

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.orders[':orderId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete order')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Order deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
