import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.sizes[':sizeId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.sizes[':sizeId']['$delete']>

export const useDeleteSize = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.sizes[':sizeId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete size')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Size deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['sizes'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
