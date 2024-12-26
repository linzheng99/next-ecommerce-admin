"use client"

import { type Category, type Image as ImageType, type Product } from "@prisma/client"
import { Expand, ShoppingCart } from "lucide-react";

import Currency from "./currency";
import IconButton from "./icon-button";

interface ProductCardProps {
  data: Omit<Product, "price"> & {
    images: ImageType[]
    price: string
    category: Category
  }
}
export default function ProductCard({ data }: ProductCardProps) {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <img
          src={data?.images?.[0].url}
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full bottom-5 ">
          <div className="flex justify-center items-end gap-x-6">
            <IconButton
              icon={<Expand className="text-gray-600" size={20} />}
              onClick={() => { }}
            />
            <IconButton
              icon={<ShoppingCart className="text-gray-600" size={20} />}
              onClick={() => { }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-gray-500 text-sm">{data.category?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  )
}
