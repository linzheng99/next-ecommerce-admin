import { toast } from "sonner"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { type ShopProductType } from "@/types"

interface CartState {
  items: ShopProductType[]
  addItem: (item: ShopProductType) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

export const useCart = create(persist<CartState>((set, get) => (
  {
    items: [],
    addItem: (data: ShopProductType) => {
      const currentItem = get().items
      const existingItem = currentItem.find((item) => item.id === data.id)
      if (existingItem) {
        return toast.error("Item already in cart")
      }
      set({ items: [...get().items, data] })
      toast.success("Item added to cart")
    },
    removeItem: (id: string) => {
      set((state) => {
        const items = state.items.filter((item) => item.id !== id)
        toast.success("Item removed from cart")
        return { items }
      })
    },
    removeAll: () => set({ items: [] }),
  }
),
  {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  }),
)

