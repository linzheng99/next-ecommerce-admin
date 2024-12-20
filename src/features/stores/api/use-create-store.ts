import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.stores['$post'], 200>
type RequestType = InferRequestType<typeof client.api.stores['$post']>

export const useCreateStore = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.stores['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create store')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Store created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['stores'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
