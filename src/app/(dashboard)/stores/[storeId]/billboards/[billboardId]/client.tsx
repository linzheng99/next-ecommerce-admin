import { useGetBillboard } from "@/features/billboards/api/use-get-billboard"
import BillboardSettings from "@/features/billboards/components/billboard-settings"

interface BillboardIdClientProps {
  billboardId: string
}

export function BillboardIdClient({ billboardId }: BillboardIdClientProps) {
  const { data: billboard } = useGetBillboard({ billboardId })

  if (!billboard) {
    return <div>Billboard not found</div>
  }

  return (
    <div>
      <BillboardSettings initialData={billboard} />
    </div>
  )
}
