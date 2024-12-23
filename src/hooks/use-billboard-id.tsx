import { useParams } from "next/navigation"

export function useBillboardId() {
  const params = useParams()
  return params.billboardId as string
}
