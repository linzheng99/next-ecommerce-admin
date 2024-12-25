import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InferRequestType, type InferResponseType } from 'hono'
import { toast } from 'sonner'

import { client } from '@/lib/rpc'

type ResponseType = InferResponseType<typeof client.api.colors[':colorId']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.colors[':colorId']['$patch']>

export const useUpdateColor = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.colors[':colorId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Failed to update color')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Color updated successfully!')
      void queryClient.invalidateQueries({ queryKey: ['colors'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return mutation
}
