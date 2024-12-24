"use client"

import { type Billboard } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Category = {
  id: string
  name: string
  billboard: Billboard
  createdAt: string
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => {
      return row.original.billboard.label
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original
      return <CellAction category={category} />
    },
  }
]
