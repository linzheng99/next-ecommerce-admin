"use server"

import prismadb from "@/lib/prismadb"

export  async function getSizes({ storeId }: { storeId: string }) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  })

  return sizes
}
