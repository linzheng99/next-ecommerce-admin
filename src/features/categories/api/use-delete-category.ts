import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.categories[':categoryId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.categories[':categoryId']['$delete']>

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.categories[':categoryId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Category deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
