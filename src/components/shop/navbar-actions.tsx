"use client"

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";

export default function NavbarActions() {
  const { items } = useCart()
  const router = useRouter()

  return (
    <div className="flex items-center gap-x-4 ml-auto">
      <Button className="flex items-center gap-x-2" size="sm" variant="default" onClick={() => router.push("/shop/cart")}>
        <ShoppingBag className="w-4 h-4" />
        <span className="text-sm font-medium">{items.length}</span>
      </Button>
    </div>
  )
}
