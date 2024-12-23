"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type Billboard = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const billboard = row.original
      return <CellAction billboard={billboard} />
    },
  }
]
