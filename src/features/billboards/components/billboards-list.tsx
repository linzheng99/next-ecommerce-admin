import { Pencil } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import PageLoader from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useStoreId } from "@/hooks/use-store-id"

import { useGetBillboards } from "../api/use-get-billboards"

export default function BillboardsList() {
  const storeId = useStoreId()
  const router = useRouter()
  const { data, isLoading } = useGetBillboards({ storeId })

  if (isLoading) return <PageLoader />

  return (
    <div className="flex flex-col gap-4">
      {data?.map((billboard) => (
        <div key={billboard.id}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{billboard.label}</h3>
            <Image src={billboard.imageUrl} alt={billboard.label} width={100} height={100} />
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/stores/${storeId}/billboards/${billboard.id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

