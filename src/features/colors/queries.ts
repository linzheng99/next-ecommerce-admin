"use server"

import prismadb from "@/lib/prismadb"

export async function getColors({ storeId }: { storeId: string }) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  })

  return colors
}
