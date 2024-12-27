"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XIcon } from 'lucide-react'
import { Fragment } from 'react'

import { usePreviewModal } from '@/store/use-preview-modal'

import IconButton from './icon-button'

export default function ProductModal({ children }: { children: React.ReactNode }) {
  const { isOpen, onClose } = usePreviewModal()
  return (
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full h-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-4">
                    <IconButton icon={<XIcon className="size-6" />} onClick={onClose} />
                  </div>
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
