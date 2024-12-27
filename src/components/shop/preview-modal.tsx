import { usePreviewModal } from "@/store/use-preview-modal"

import ProductInfo from "./product-info"
import ProductModal from "./product-modal"
import ProductTab from "./product-tab"

export default function PreviewModal() {
  const { data } = usePreviewModal()

  if (!data) return null

  return (
    <ProductModal>
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <ProductTab images={data?.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <ProductInfo product={data} />
        </div>
      </div>
    </ProductModal>
  )
}
