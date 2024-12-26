"use client"

import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetSizes } from "@/features/sizes/api/use-get-sizes"
import ApiList from "@/features/sizes/components/api-list"
import { columns } from "@/features/sizes/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function SizesClient() {
  const router = useRouter()
  const storeId = useStoreId()

  const { data, isLoading } = useGetSizes({ storeId })

  if (isLoading) return <PageLoader />

  const formattedSizes = data?.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(new Date(size.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data?.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/sizes/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formattedSizes ?? []} searchKey="name" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  )
}
