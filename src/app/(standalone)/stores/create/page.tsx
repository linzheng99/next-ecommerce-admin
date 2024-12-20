"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateStore } from "@/features/stores/api/use-create-store"
import { createStoreSchema } from "@/features/stores/schemas"


export default function CreateStorePage() {
  const router = useRouter()
  const { mutate, isPending } = useCreateStore()

  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof createStoreSchema>) {
    mutate({ json: values }, {
      onSuccess: (data) => {
        router.push(`/stores/${data.id}`)
        form.reset()
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Create store</CardTitle>
          <CardDescription>Add a new store to manage products and categories</CardDescription>
        </CardHeader>
        <CardContent>
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
                <Button type="submit" disabled={isPending}>Continue</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}
