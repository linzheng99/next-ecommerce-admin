"use client"

import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetBillboards } from "@/features/billboards/api/use-get-billboards"
import { columns } from "@/features/billboards/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function BillboardsClient() {
  const router = useRouter()
  const storeId = useStoreId()

  const { data, isLoading } = useGetBillboards({ storeId })

  if (isLoading) return <PageLoader />

  const formattedBillboards = data?.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(new Date(billboard.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data?.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/billboards/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formattedBillboards ?? []} searchKey="label" />
    </div>
  )
}
