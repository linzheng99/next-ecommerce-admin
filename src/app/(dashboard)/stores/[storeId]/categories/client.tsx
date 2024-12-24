"use client"

import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import ApiList from "@/features/categories/components/api-list"
import { columns } from "@/features/categories/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function CategoriesClient() {
  const router = useRouter()
  const storeId = useStoreId()

  const { data, isLoading } = useGetCategories({ storeId })

  if (isLoading) return <PageLoader />

  const formattedCategories = data?.map((category) => ({
    id: category.id,
    name: category.name,
    billboard: category.billboard,
    createdAt: format(new Date(category.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data?.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/categories/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formattedCategories ?? []} searchKey="name" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  )
}
