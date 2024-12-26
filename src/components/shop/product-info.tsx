import { type Category, type Color, type Product, type Size } from "@prisma/client"
import { ShoppingCartIcon } from "lucide-react"

import { Button } from "../ui/button"
import Currency from "./currency"

interface ProductInfoProps {
  product: (Product & {
    category: Category
    size: Size
    color: Color
  }) | null
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className='mt-10 sm:mt-16 lg:mt-0'>
      <h1 className='text-3xl font-bold text-gray-900'>{product?.name}</h1>
      <div className='mt-3 flex'>
        <p className='text-2xl text-gray-500'>
          <Currency value={product?.price.toString() || ''} />
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <h3 className='font-medium text-black'>
            Size:
          </h3>
          <p>
            {product?.size.name}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <h3 className='font-medium text-black'>
            Color:
          </h3>
          <div className='w-4 h-4 rounded-full' style={{ backgroundColor: product?.color.value }} />
        </div>
        <div className="mt-6">
          <Button className="flex items-center gap-2 rounded-full">
            <ShoppingCartIcon className="w-4 h-4" />
            Add to Cart
          </Button>

        </div>
      </div>
    </div>
  )
}
