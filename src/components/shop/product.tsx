
import { type Category, type Image as ImageType, type Product } from '@prisma/client';

import ProductCard from "./product-card";

interface ProductProps {
  products: (Omit<Product, "price"> & {
    images: ImageType[]
    price: string
    category: Category
  })[]
  title?: string
}

export default function Product({ products, title }: ProductProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden space-y-4">
      <span className="text-2xl font-bold">
        {title}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.filter((product) => product.images.length > 0).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
};
