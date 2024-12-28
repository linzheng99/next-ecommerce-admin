import { type Category, type Color, type Image, type Product,type Size } from "@prisma/client"

export type ShopProductType = Omit<Product, "price"> & {
  images: Image[]
  price: string
  category: Category
  size: Size
  color: Color
}

