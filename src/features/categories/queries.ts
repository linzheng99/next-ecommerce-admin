"use server"

import prismadb from "@/lib/prismadb"

interface GetCategoriesProps {
  storeId: string
}

export async function getCategories({ storeId }: GetCategoriesProps) {
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

export async function getCategoryById({ categoryId }: { categoryId: string }) {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      billboard: true,
    },
  })

  return category
}
