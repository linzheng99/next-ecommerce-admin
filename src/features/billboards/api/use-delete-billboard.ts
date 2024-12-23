import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.billboards[':billboardId']['$delete'], 200>
type RequestType = InferRequestType<typeof client.api.billboards[':billboardId']['$delete']>

export const useDeleteBillboard = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.billboards[':billboardId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Failed to delete billboard')
      }

      return await response.json()
    },
    onSuccess: (data) => {
      toast.success('Billboard deleted successfully!')
      void queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
