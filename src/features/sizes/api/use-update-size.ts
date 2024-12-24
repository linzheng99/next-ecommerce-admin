import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.sizes[':sizeId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.sizes[':sizeId']['$patch']>

export const useUpdateSize = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.sizes[':sizeId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to update size')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Size updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['sizes'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
