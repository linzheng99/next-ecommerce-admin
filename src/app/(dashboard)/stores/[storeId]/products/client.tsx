/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetProducts } from "@/features/products/api/use-get-products"
import ApiList from "@/features/products/components/api-list"
import { columns } from "@/features/products/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function ProductsClient() {
  const router = useRouter()
  const storeId = useStoreId()

  const { data, isLoading } = useGetProducts({ storeId })

  if (isLoading) return <PageLoader />

  const formattedProducts = data?.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    category: product.category.name,
    color: product.color.value,
    size: product.size.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    createdAt: format(new Date(product.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/stores/${storeId}/products/create`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formattedProducts as any || []} searchKey="name" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </div>
  )
}
