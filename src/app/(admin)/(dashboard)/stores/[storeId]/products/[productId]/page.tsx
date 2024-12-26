"use client"

import { useProductId } from "@/hooks/use-product-id";
import { useStoreId } from "@/hooks/use-store-id";

import { ProductIdClient } from "./client";

export default function ProductIdPage() {
  const productId = useProductId()
  const storeId = useStoreId()

  return <ProductIdClient productId={productId} storeId={storeId} />
}
