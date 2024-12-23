import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.billboards[':billboardId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.billboards[':billboardId']['$patch']>

export const useUpdateBillboard = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.billboards[':billboardId']['$patch']({ param, json })

      if (!response.ok) {
        throw new Error('Failed to update billboard')
      }

      return await response.json()
    },
    onSuccess: (data) => {
      toast.success('Billboard updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['billboards', data.storeId] })
      void queryClient.invalidateQueries({ queryKey: ['billboards', data.id] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
