"use client"

import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react"

import { type GraphRevenue } from "@/actions/get-graph-revenue"
import Overview from "@/components/over-view"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"


interface StoreIdClientProps {
  totalRevenue: number
  salesCount: number
  productsInStock: number
  graphData: GraphRevenue[]
}

export default function StoreIdClient({ totalRevenue, salesCount, productsInStock, graphData }: StoreIdClientProps) {
  return (
    <div className="flex flex-col p-8 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-sm" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatPrice.format(totalRevenue || 0)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-sm" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            +{salesCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products in Stock</CardTitle>
            <PackageIcon className="h-4 w-4 text-sm" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {productsInStock}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphData} />
        </CardContent>
      </Card>
    </div>
  )
};

