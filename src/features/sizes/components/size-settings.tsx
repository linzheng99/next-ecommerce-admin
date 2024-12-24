"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Size } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { type z } from "zod"

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
import { useSizeId } from "@/hooks/use-size-id"
import { useStoreId } from "@/hooks/use-store-id"

import { useUpdateSize } from "../api/use-update-size"
import { updateSizeSchema } from "../schemas"

interface SizeSettingsProps {
  initialData: Size | null
}

export default function SizeSettings({ initialData }: SizeSettingsProps) {
  const storeId = useStoreId()
  const sizeId = useSizeId()
  const router = useRouter()
  const { mutate, isPending } = useUpdateSize()
  const form = useForm<z.infer<typeof updateSizeSchema>>({
    resolver: zodResolver(updateSizeSchema),
    defaultValues: initialData || { name: '', value: '' },
  })

  function onSubmit(values: z.infer<typeof updateSizeSchema>) {
    mutate({
      json: {
        name: values.name,
        storeId: storeId,
        value: values.value,
      },
      param: {
        sizeId: sizeId,
      },
    }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/sizes`)
      }
    })
  }

  return (
    <div className="w-full p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Small, Medium, Large, etc." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Value </FormLabel>
                  <FormControl>
                    <Input placeholder="S, M, L, XL, etc." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Button type="submit" size="sm" disabled={isPending}>Save changes</Button>
          </div>
        </form>
      </Form>
    </div>
  )
};
