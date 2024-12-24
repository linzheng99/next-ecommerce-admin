import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.categories[':categoryId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.categories[':categoryId']['$patch']>

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.categories[':categoryId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Category updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
