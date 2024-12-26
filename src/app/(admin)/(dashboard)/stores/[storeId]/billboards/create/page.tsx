"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod"

import { ImageUpload } from "@/components/image-upload";
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
import { useCreateBillboard } from "@/features/billboards/api/use-create-billboard";
import { createBillboardSchema } from "@/features/billboards/schemas";
import { useStoreId } from "@/hooks/use-store-id";

export default function CreateBillboardModal() {
  const router = useRouter()
  const storeId = useStoreId()
  const { mutate, isPending } = useCreateBillboard()

  const form = useForm<z.infer<typeof createBillboardSchema>>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: {
      label: "",
      imageUrl: undefined,
      storeId: storeId,
    },
  })

  function onSubmit(values: z.infer<typeof createBillboardSchema>) {
    mutate({ json: values }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/billboards`)
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
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Label </FormLabel>
                <FormControl>
                  <Input placeholder="Billboard Label" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {}}
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
