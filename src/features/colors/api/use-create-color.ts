import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.colors['$post'], 200>
type RequestType = InferRequestType<typeof client.api.colors['$post']>

export const useCreateColor = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.colors['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create color')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Color created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['colors'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
