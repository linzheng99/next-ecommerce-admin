"use client"

import Modal from "@/components/modal";

import { useStoreModal } from "../store/use-store-modal";

export default function StoreModal() {
  const storeModal = useStoreModal()

  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          children
        </div>
      </div>
    </Modal>
  )
};
