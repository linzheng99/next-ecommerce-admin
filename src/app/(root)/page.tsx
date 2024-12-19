"use client"

import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react';

import { useStoreModal } from '@/features/stores/store/use-store-modal';

export default function SetupPage() {
  const { isOpen, onOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className='p-4'>
      <h1>Next Ecommerce Admin Dashboard</h1>
      <UserButton />
    </div>
  );
}
