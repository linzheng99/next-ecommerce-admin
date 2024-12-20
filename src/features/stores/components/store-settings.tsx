import { zodResolver } from "@hookform/resolvers/zod"
import { type Store } from "@prisma/client"
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

import { useUpdateStore } from "../api/use-update-store"
import { updateStoreSchema } from "../schemas"

interface StoreSettingsProps {
  initialData: Store
}

export default function StoreSettings({ initialData }: StoreSettingsProps) {
  const { mutate, isPending } = useUpdateStore()
  const form = useForm<z.infer<typeof updateStoreSchema>>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: initialData,
  })

  function onSubmit(values: z.infer<typeof updateStoreSchema>) {
    mutate({
      json: {
        name: values.name,
      },
      param: {
        storeId: initialData.id,
      },
    })
  }

  return (
    <div className="w-full">
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
            <Button type="submit" size="sm" disabled={isPending}>Save</Button>
          </div>
        </form>
      </Form>
    </div>
  )
};
