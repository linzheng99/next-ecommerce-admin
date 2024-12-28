
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useCheckout } from "@/features/checkout/api/use-checkout";
import { useCart } from "@/store/use-cart";
import { type ShopProductType } from "@/types";

import { Button } from "../ui/button";
import Currency from "./currency";

export default function Summary({ data }: { data: ShopProductType[] }) {
  const searchParams = useSearchParams()
  const { mutate: checkout, isPending } = useCheckout()
  const { removeAll } = useCart()
  const totalPrice = data.reduce((total, item) => total + Number(item.price), 0)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Payment canceled.')
    }
  }, [searchParams, removeAll])

  function handleCheckout() {
    const productIds = data.map((item) => item.id)
    checkout(
      { json: { productIds }, param: { storeId: process.env.NEXT_PUBLIC_STORE_ID! } },
      {
        onSuccess: (data) => {
          if (data.url) {
            window.location.href = data.url
          }
        },
        onError: () => {
          toast.error('Failed to checkout')
        }
      })
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
      <Button variant="default" className="w-full rounded-full mt-6" onClick={handleCheckout} disabled={isPending}>
        {isPending ? 'Processing...' : 'Checkout'}
      </Button>
    </div>
  )
}
