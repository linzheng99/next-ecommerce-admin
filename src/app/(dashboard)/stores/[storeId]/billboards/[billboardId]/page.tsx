"use client"

import { useBillboardId } from "@/hooks/use-billboard-id";

import { BillboardIdClient } from "./client";


export default function BillboardIdPage() {
  const billboardId = useBillboardId()
  return <BillboardIdClient billboardId={billboardId} />
}
