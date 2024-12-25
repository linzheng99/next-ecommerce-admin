import { useParams } from "next/navigation"

export function useColorId() {
  const params = useParams()
  return params.colorId as string
}
