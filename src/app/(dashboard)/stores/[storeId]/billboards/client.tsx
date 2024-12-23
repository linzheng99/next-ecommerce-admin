"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import BillboardsList from "@/features/billboards/components/billboards-list"
import { useStoreId } from "@/hooks/use-store-id"

export default function BillboardsClient() {
  const router = useRouter()
  const storeId = useStoreId()

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards"
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/billboards/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <BillboardsList />
    </div>
  )
}
