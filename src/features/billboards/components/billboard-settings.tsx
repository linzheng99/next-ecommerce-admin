"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Billboard } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { ImageUpload } from "@/components/image-upload"
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
import { useBillboardId } from "@/hooks/use-billboard-id"
import { useStoreId } from "@/hooks/use-store-id"

import { useUpdateBillboard } from "../api/use-update-billboard"
import { updateBillboardSchema } from "../schemas"

interface BillboardSettingsProps {
  initialData: Billboard | null
}

export default function BillboardSettings({ initialData }: BillboardSettingsProps) {
  const storeId = useStoreId()
  const billboardId = useBillboardId()
  const router = useRouter()
  const { mutate, isPending } = useUpdateBillboard()
  const form = useForm<z.infer<typeof updateBillboardSchema>>({
    resolver: zodResolver(updateBillboardSchema),
    defaultValues: initialData || { label: '', imageUrl: '' },
  })

  function onSubmit(values: z.infer<typeof updateBillboardSchema>) {
    mutate({
      json: {
        label: values.label,
        imageUrl: values.imageUrl,
        storeId: storeId,
      },
      param: {
        billboardId: billboardId,
      },
    }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/billboards`)
      }
    })
  }

  return (
    <div className="w-full p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Background image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="label"
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
          </div>
          <div className="flex items-center gap-4 w-full">
            <Button type="submit" size="sm" disabled={isPending}>Save changes</Button>
          </div>
        </form>
      </Form>
    </div>
  )
};
