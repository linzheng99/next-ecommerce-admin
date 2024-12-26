"use client"

import { useStoreId } from "@/hooks/use-store-id"

export default function StoreIdClient() {
  const storeId = useStoreId()

  return <div>{storeId}</div>
};

