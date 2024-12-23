import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { useStoreId } from "@/hooks/use-store-id"

import { useDeleteBillboard } from "../api/use-delete-billboard"
import { type Billboard } from "./columns"

interface CellActionProps {
  billboard: Billboard
}

export function CellAction({ billboard }: CellActionProps) {
  const router = useRouter()
  const storeId = useStoreId()
  const { mutate: deleteBillboard, isPending } = useDeleteBillboard()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this billboard?',
    'This action cannot be undone.',
    'destructive',
  )

  async function onCopy(id: string) {
    await navigator.clipboard.writeText(id)
    toast.success("Billboard ID copied to clipboard")
  }

  async function onDelete() {
    const ok = await confirm()
    if (!ok) return

    deleteBillboard({ param: { billboardId: billboard.id } })
    toast.success("Billboard deleted")
    router.refresh()
  }

  return (
    <>
    <ConfirmDialog />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(billboard.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/stores/${storeId}/billboards/${billboard.id}`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} disabled={isPending}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

