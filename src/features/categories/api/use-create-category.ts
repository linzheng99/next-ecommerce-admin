import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.categories['$post'], 200>
type RequestType = InferRequestType<typeof client.api.categories['$post']>

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.categories['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create category')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Category created successfully!')
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
