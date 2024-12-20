"use client"

import { useAuth } from "@clerk/nextjs"

import { useStoreId } from "@/hooks/use-store-id"

export default function StoreIdClient() {
  const storeId = useStoreId()
  const { userId } = useAuth()

  return <div>{storeId}</div>
};

