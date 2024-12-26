import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetSize } from "@/features/sizes/api/use-get-size"
import SizeSettings from "@/features/sizes/components/size-settings"

interface SizeIdClientProps {
  sizeId: string
}

export function SizeIdClient({ sizeId }: SizeIdClientProps) {
  const { data: size, isLoading } = useGetSize({ sizeId })

  if (isLoading) return <PageLoader />

  if (!size) return <PageError />

  return (
    <div>
      <SizeSettings initialData={size} />
    </div>
  )
}
