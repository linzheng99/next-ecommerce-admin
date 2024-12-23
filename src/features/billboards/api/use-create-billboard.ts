import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.billboards['$post'], 200>
type RequestType = InferRequestType<typeof client.api.billboards['$post']>

export const useCreateBillboard = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.billboards['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create billboard')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Billboard created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['billboards'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
