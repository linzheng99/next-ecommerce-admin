"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod"

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useCreateStore } from "../api/use-create-store";
import { createStoreSchema } from "../schemas";
import { useStoreModal } from "../store/use-store-modal";

export default function StoreModal() {
  const storeModal = useStoreModal()
  const { mutate, isPending } = useCreateStore()

  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof createStoreSchema>) {
    mutate({ json: values }, {
      onSuccess: () => {
        form.reset()
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="E-Commerce Store" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-4 w-full">
              <Button type="button" variant="outline" onClick={storeModal.onClose} disabled={isPending}>Cancel</Button>
              <Button type="submit" disabled={isPending}>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
};
