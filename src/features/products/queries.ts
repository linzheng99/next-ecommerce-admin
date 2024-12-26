
import prismadb from "@/lib/prismadb"

export async function getProducts({ storeId, name, categoryId }: { storeId: string, name?: string, categoryId?: string }) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
      isFeatured: true,
      name: name,
      categoryId: categoryId
    },
    include: {
      images: true,
      category: true
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
