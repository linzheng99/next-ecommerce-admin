"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Size = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const size = row.original
      return <CellAction size={size} />
    },
  }
]
