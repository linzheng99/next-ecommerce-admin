import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.stores[':storeId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.stores[':storeId']['$delete']>

export const useDeleteStore = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.stores[':storeId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete store')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Store deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['stores'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
