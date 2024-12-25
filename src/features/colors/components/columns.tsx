"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Color = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const color = row.original
      return <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: color.value }} />
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
      const color = row.original
      return <CellAction color={color} />
    },
  }
]
