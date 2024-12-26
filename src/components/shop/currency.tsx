import { formatPrice } from "@/lib/utils"

interface CurrencyProps {
  value: number | string
}

export default function Currency({ value }: CurrencyProps) {
  return <span className="font-semibold">{formatPrice.format(Number(value))}</span>
}
