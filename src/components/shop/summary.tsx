
import { type ShopProductType } from "@/types";

import { Button } from "../ui/button";
import Currency from "./currency";

export default function Summary({ data }: { data: ShopProductType[] }) {
  const totalPrice = data.reduce((total, item) => total + Number(item.price), 0)

  function handleCheckout() {
    const productIds = data.map((item) => ({
      productId: item.id,
    }))
    console.log(productIds)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center border-t border-gray-200 pt-4 ">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button variant="default" className="w-full rounded-full mt-6" onClick={handleCheckout}>Checkout</Button>
    </div>
  )
}
