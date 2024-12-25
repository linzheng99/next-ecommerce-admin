import PageError from "@/components/page-error"
import PageLoader from "@/components/page-loader"
import { useGetColor } from "@/features/colors/api/use-get-color"
import ColorSettings from "@/features/colors/components/color-settings"

interface ColorIdClientProps {
  colorId: string
}

export function ColorIdClient({ colorId }: ColorIdClientProps) {
  const { data: color, isLoading } = useGetColor({ colorId })

  if (isLoading) return <PageLoader />

  if (!color) return <PageError />

  return (
    <div>
      <ColorSettings initialData={color} />
    </div>
  )
}
