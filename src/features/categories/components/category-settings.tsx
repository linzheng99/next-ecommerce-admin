"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Category } from "@prisma/client"
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
import { useCategoryId } from "@/hooks/use-category-id"
import { useStoreId } from "@/hooks/use-store-id"

import { useUpdateCategory } from "../api/use-update-category"
import { updateCategorySchema } from "../schemas"

interface CategorySettingsProps {
  initialData: Category | null
}

export default function CategorySettings({ initialData }: CategorySettingsProps) {
  const storeId = useStoreId()
  const categoryId = useCategoryId()
  const router = useRouter()
  const { mutate, isPending } = useUpdateCategory()
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: initialData || { name: '', billboardId: '' },
  })

  function onSubmit(values: z.infer<typeof updateCategorySchema>) {
    mutate({
      json: {
        name: values.name,
        storeId: storeId,
        billboardId: values.billboardId,
      },
      param: {
        categoryId: categoryId,
      },
    }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/categories`)
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
