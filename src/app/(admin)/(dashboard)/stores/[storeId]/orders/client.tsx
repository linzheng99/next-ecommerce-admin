"use client"

import { format } from "date-fns"

import { DataTable } from "@/components/data-table"
import Heading from "@/components/heading"
import PageLoader from "@/components/page-loader"
import { Separator } from "@/components/ui/separator"
import { useGetOrders } from "@/features/orders/api/use-get-orders"
import { columns } from "@/features/orders/components/columns"
import { useStoreId } from "@/hooks/use-store-id"

export default function OrdersClient() {
  const storeId = useStoreId()

  const { data, isLoading } = useGetOrders({ storeId })

  if (isLoading) return <PageLoader />

  const formattedOrders = data?.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    orderItems: order.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: order.orderItems.reduce((acc, item) => acc + Number(item.product.price), 0),
    isPaid: order.isPaid,
    createdAt: format(new Date(order.createdAt), 'yyyy/MM/dd'),
  }))

  return (
    <div className="flex flex-col gap-4 p-8">
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={formattedOrders ?? []} searchKey="phone" />
    </div>
  )
}
