import prismadb from "@/lib/prismadb"

interface UseGetSalesCountProps {
  storeId: string
}

export const getSalesCount = async ({ storeId }: UseGetSalesCountProps) => {
  const response = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  })
  return response
}
