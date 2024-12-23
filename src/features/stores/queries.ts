"use server"

import prismadb from "@/lib/prismadb"

export async function getStoresByUserId({ userId }: { userId: string }) {
  const stores = await prismadb.store.findMany({
    where: { userId },
  })

  return stores
}
