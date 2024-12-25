"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Color } from "@prisma/client"
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
import { useColorId } from "@/hooks/use-color-id"
import { useStoreId } from "@/hooks/use-store-id"

import { useUpdateColor } from "../api/use-update-color"
import { updateColorSchema } from "../schemas"

interface ColorSettingsProps {
  initialData: Color | null
}

export default function ColorSettings({ initialData }: ColorSettingsProps) {
  const storeId = useStoreId()
  const colorId = useColorId()
  const router = useRouter()
  const { mutate, isPending } = useUpdateColor()
  const form = useForm<z.infer<typeof updateColorSchema>>({
    resolver: zodResolver(updateColorSchema),
    defaultValues: initialData || { name: '', value: '' },
  })

  function onSubmit(values: z.infer<typeof updateColorSchema>) {
    mutate({
      json: {
        name: values.name,
        storeId: storeId,
        value: values.value,
      },
      param: {
        colorId: colorId,
      },
    }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/colors`)
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
                    <Input placeholder="Black" {...field} disabled={isPending} />
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
                    <div className="flex items-center gap-x-4">
                      <Input placeholder="#000000" {...field} disabled={isPending} />
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: field.value }} />
                      </div>
                    </div>
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
