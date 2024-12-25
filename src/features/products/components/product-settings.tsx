"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Category, type Color, type Image, type Product, type Size } from "@prisma/client"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProductId } from "@/hooks/use-product-id"
import { useStoreId } from "@/hooks/use-store-id"

import { useUpdateProduct } from "../api/use-update-product"
import { updateProductSchema } from "../schemas"

interface ProductSettingsProps {
  initialData: Product & {
    images: Image[]
  } | null
  colors: Color[]
  sizes: Size[]
  categories: Category[]
}

export default function ProductSettings({ initialData, colors, sizes, categories }: ProductSettingsProps) {
  const storeId = useStoreId()
  const productId = useProductId()
  const router = useRouter()
  const { mutate, isPending } = useUpdateProduct()
  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(initialData.price.toString()),
    } : {
      name: '',
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      images: [],
      isFeatured: false,
      isArchived: false,
      storeId: storeId
    },
  })

  function onSubmit(values: z.infer<typeof updateProductSchema>) {
    mutate({
      json: {
        name: values.name,
        storeId: storeId,
        price: parseFloat(values.price.toString()),
        categoryId: values.categoryId,
        colorId: values.colorId,
        sizeId: values.sizeId,
        images: values.images,
        isFeatured: values.isFeatured,
        isArchived: values.isArchived,
      },
      param: {
        productId: productId,
      },
    }, {
      onSuccess: () => {
        router.push(`/stores/${storeId}/products`)
      }
    })
  }

  return (
    <div className="w-full p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Product Images </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) => field.onChange(field.value.filter((image) => image.url !== url))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Product Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Product Price </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="9.99"
                      {...field}
                      disabled={isPending}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Category </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Color </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Size </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes?.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
