"use client"

import { type Category, type Color, type Size } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  color: Color
  size: Size
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.original.color
      return (
        <div className="flex items-center gap-x-2">
          <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: color.value }} />
          <div className="text-sm">{color.value}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original
      return <CellAction product={product} />
    },
  }
]
