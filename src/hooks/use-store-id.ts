import { useParams } from "next/navigation"

export function useStoreId() {
  const params = useParams()
  return params.storeId as string
}
