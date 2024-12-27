"use client"

import { useEffect, useState } from "react"

import StoreModal from "@/features/stores/components/store-modal"

import PreviewModal from "./shop/preview-modal"


export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
      <PreviewModal />
    </>
  )
};
