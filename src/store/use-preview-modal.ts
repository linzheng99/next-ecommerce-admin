import { type Category, type Color, type Image, type Product,type Size } from '@prisma/client'
import { create } from 'zustand'

type ProductWithPrice = Omit<Product, "price"> & {
  price: string
  category: Category
  images: Image[]
  size: Size
  color: Color
}

interface PreviewModalStore {
  isOpen: boolean
  data?: ProductWithPrice
  onOpen: (data: ProductWithPrice) => void
  onClose: () => void
}

export const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ProductWithPrice) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}))
