"use client"

import { useEffect, useState } from "react"

import CartItem from "@/components/shop/cart-item"
import Summary from "@/components/shop/summary"
import { useCart } from "@/store/use-cart"

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items } = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="bg-white">
      <div className="px-8 py-16 sm:px-6 lg:px-18">
        <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {items.length === 0 && <p className="text-neutral-500">No items in cart</p>}
            {items?.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </div>
          <div className="mt-12 lg:col-span-5 lg:mt-0 bg-gray-50 rounded-lg">
            <Summary data={items} />
          </div>
        </div>
      </div>
    </div>
  )
}

