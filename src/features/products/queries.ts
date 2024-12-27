
import prismadb from "@/lib/prismadb"

export async function getProducts({ storeId, name, categoryId, sizeId, colorId }: { storeId: string, name?: string, categoryId?: string, sizeId?: string, colorId?: string }) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
      isFeatured: true,
      name: name,
      categoryId: categoryId,
      sizeId: sizeId,
      colorId: colorId
    },
    include: {
      images: true,
      category: true,
      size: true,
      color: true
    }
  })

  return products.map((product) => ({
    ...product,
    price: product.price.toString(),
  }))
}

export async function getProductById({ productId }: { productId: string }) {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      category: true,
      size: true,
      color: true
    }
  })

  return product
}
