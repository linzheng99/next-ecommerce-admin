import prismadb from "@/lib/prismadb"

interface UseGetTotalRevenueProps {
  storeId: string
}

export const getTotalRevenue = async ({ storeId }: UseGetTotalRevenueProps) => {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    const totalRevenue = orders.reduce((acc, order) => {
      const orderTotal = order.orderItems.reduce((acc, item) => {
        return acc + Number(item.product.price);
      }, 0);
      return acc + orderTotal;
    }, 0);
    return totalRevenue;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
