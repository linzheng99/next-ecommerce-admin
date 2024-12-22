"use client"

import { Plus } from "lucide-react"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function BillboardsClient() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards"
          description="Manage billboards for your store"
        />
        <Button>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </div>
  )
}
