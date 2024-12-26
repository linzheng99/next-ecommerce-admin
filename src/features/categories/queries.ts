"use server"

import prismadb from "@/lib/prismadb"

export  async function getCategories(storeId: string) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return categories

}
