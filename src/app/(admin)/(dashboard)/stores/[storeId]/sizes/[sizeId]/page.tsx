"use client"

import { useSizeId } from "@/hooks/use-size-id";

import { SizeIdClient } from "./client";

export default function SizeIdPage() {
  const sizeId = useSizeId()
  return <SizeIdClient sizeId={sizeId} />
}
