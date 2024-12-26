
import prismadb from "@/lib/prismadb"

export async function getProducts({ storeId }: { storeId: string }) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
      isFeatured: true
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
