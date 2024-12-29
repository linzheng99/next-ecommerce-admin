import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { getGraphRevenue } from "@/actions/get-graph-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getTotalRevenue } from "@/actions/get-total-revenue"

import StoreIdClient from "./client"

interface StoreIdPageProps {
  params: Promise<{
    storeId: string
  }>
}


export default async function StoreIdPage({ params }: StoreIdPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { storeId } = await params

  const totalRevenue = await getTotalRevenue({ storeId })
  const salesCount = await getSalesCount({ storeId })
  const productsInStock = await getStockCount({ storeId })
  const graphData = await getGraphRevenue({ storeId })

  return <StoreIdClient totalRevenue={totalRevenue} salesCount={salesCount} productsInStock={productsInStock} graphData={graphData} />
}

