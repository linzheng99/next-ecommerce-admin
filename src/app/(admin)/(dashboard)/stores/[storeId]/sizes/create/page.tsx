"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useCreateSize } from "@/features/sizes/api/use-create-size";
import { createSizeSchema } from "@/features/sizes/schemas";
import { useStoreId } from "@/hooks/use-store-id";

export default function CreateSizeModal() {
  const router = useRouter()
  const storeId = useStoreId()
  const { mutate, isPending } = useCreateSize()

  const form = useForm<z.infer<typeof createSizeSchema>>({
    resolver: zodResolver(createSizeSchema),
    defaultValues: {
      name: "",
      value: "",
      storeId: storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createSizeSchema>) {
    mutate({ json: values }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/sizes`)
        form.reset()
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  return (
    <div className="flex flex-col p-8 space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
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
            <Button
              type="button"
              variant="outline"
              onClick={() => { }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
};
