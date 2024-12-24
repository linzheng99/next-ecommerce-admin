import { useParams } from "next/navigation"

export function useCategoryId() {
  const params = useParams()
  return params.categoryId as string
}
