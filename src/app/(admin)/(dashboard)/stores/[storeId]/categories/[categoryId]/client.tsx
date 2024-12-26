import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetCategory } from "@/features/categories/api/use-get-category"
import CategorySettings from "@/features/categories/components/category-settings"

interface CategoryIdClientProps {
  categoryId: string
}

export function CategoryIdClient({ categoryId }: CategoryIdClientProps) {
  const { data: category, isLoading } = useGetCategory({ categoryId })

  if (isLoading) return <PageLoader />

  if (!category) return <PageError />

  return (
    <div>
      <CategorySettings initialData={category} />
    </div>
  )
}
