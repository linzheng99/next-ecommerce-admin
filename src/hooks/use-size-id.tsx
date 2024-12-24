import { useParams } from "next/navigation"

export function useSizeId() {
  const params = useParams()
  return params.sizeId as string
}
