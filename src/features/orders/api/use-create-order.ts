import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.orders['$post'], 200>
type RequestType = InferRequestType<typeof client.api.orders['$post']>

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.orders['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Order created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
