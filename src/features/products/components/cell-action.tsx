import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { useStoreId } from "@/hooks/use-store-id"

import { useDeleteProduct } from "../api/use-delete-product"
import { type Product } from "./columns"

interface CellActionProps {
  product: Product
}

export function CellAction({ product }: CellActionProps) {
  const router = useRouter()
  const storeId = useStoreId()
  const { mutate: deleteProduct, isPending } = useDeleteProduct()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this product?',
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

    deleteProduct({ param: { productId: product.id } })
    toast.success("Product deleted")
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
        <DropdownMenuItem onClick={() => onCopy(product.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/stores/${storeId}/products/${product.id}`)}>
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

