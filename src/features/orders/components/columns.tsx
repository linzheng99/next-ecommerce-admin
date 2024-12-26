"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Order = {
  id: string
  phone: string
  address: string
  orderItems: string
  totalPrice: number
  isPaid: boolean
  createdAt: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return <CellAction order={order} />
    },
  }
]
