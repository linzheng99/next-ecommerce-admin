import prismadb from "@/lib/prismadb"

interface UseGetStockCountProps {
  storeId: string
}

export const getStockCount = async ({ storeId }: UseGetStockCountProps) => {
  const response = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  })
  return response
}
