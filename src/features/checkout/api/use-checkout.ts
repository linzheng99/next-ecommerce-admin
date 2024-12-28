import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.checkout[':storeId']['$post'], 200>
type RequestType = InferRequestType<typeof client.api.checkout[':storeId']['$post']>

export const useCheckout = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.checkout[':storeId']['$post']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to checkout')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Checkout completed successfully!')
      void queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
