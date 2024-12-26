"use client"

import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetColors } from "@/features/colors/api/use-get-colors"
import ApiList from "@/features/colors/components/api-list"
import { columns } from "@/features/colors/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function ColorsClient() {
  const router = useRouter()
  const storeId = useStoreId()

  const { data, isLoading } = useGetColors({ storeId })

  if (isLoading) return <PageLoader />

  const formattedColors = data?.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(new Date(color.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/colors/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formattedColors ?? []} searchKey="name" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </div>
  )
}
