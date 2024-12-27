import { create } from 'zustand'

interface CategoryFilterStore {
  values: Record<string, string>
  setValue: (value: string, key: string) => void
}

export const useCategoryFilter = create<CategoryFilterStore>((set) => ({
  values: {},
  setValue: (value: string, key: string) => set((state) => {
    if (state.values[key] === value) {
      return { values: { ...state.values, [key]: '' } }
    }
    return { values: { ...state.values, [key]: value } }
  })
}))
