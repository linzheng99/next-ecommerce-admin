"use client"

import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import ApiAlert from "@/components/api-alert"
import Heading from "@/components/heading"
import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDeleteStore } from "@/features/stores/api/use-delete-store"
import { useGetStore } from "@/features/stores/api/use-get-store"
import StoreSettings from "@/features/stores/components/store-settings"
import { useConfirm } from "@/hooks/use-confirm"
import { useOrigin } from "@/hooks/use-origin"
import { useStoreId } from "@/hooks/use-store-id"

export default function SettingsClient() {
  const storeId = useStoreId()
  const router = useRouter()
  const origin = useOrigin()

  const { data: store, isLoading: isLoadingStore } = useGetStore({ storeId })
  const { mutate: deleteStore, isPending: isDeleting } = useDeleteStore()
  const [ConfirmationDialog, confirm] = useConfirm(
    'Delete Store',
    'Are you sure you want to delete this store?',
    'destructive'
  )

  if (isLoadingStore) return <PageLoader />
  if (!store) return <PageError message="Store not found" />

  async function handleDeleteStore() {
    const ok = await confirm()
    if (!ok) return

    deleteStore(
      { param: { storeId } },
      {
        onSuccess: () => {
          router.push('/')
        },
        onError: () => {
          toast.error('Make sure you have deleted all products and orders before deleting the store.')
        }
      },
    )
  }

  return (
    <>
      <ConfirmationDialog />
      <div className="flex flex-col p-8 space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Settings" description="Manage your store settings" />
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDeleteStore}
            disabled={isDeleting}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
        <StoreSettings initialData={store} />
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/stores/${store.id}`}
          variant="public"
        />
      </div>
    </>
  )
};

