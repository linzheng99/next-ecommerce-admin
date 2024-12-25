import { useParams } from "next/navigation"

export function useProductId() {
  const params = useParams()
  return params.productId as string
}
