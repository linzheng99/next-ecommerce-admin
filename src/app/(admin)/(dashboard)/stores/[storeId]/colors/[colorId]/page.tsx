"use client"


import { useColorId } from "@/hooks/use-color-id";

import { ColorIdClient } from "./client";

export default function ColorIdPage() {
  const colorId = useColorId()
  return <ColorIdClient colorId={colorId} />
}
