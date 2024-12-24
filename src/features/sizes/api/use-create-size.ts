import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.sizes['$post'], 200>
type RequestType = InferRequestType<typeof client.api.sizes['$post']>

export const useCreateSize = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.sizes['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create size')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Size created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['sizes'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
