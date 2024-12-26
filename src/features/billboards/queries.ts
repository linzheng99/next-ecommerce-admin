"use server"

import prismadb from "@/lib/prismadb"

export  async function getBillboard({ storeId, billboardId }: { storeId: string, billboardId: string }) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      storeId: storeId,
      id: billboardId,
    },
  })

  return billboard
}
