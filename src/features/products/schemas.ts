import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "please enter product name",
  }),
  price: z.number().min(1, {
    message: "please enter product price",
  }),
  categoryId: z.string().min(1, {
    message: "please select a category",
  }),
  colorId: z.string().min(1, {
    message: "please select a color",
  }),
  sizeId: z.string().min(1, {
    message: "please select a size",
  }),
  images: z.object({
    url: z.string().min(1, {
      message: "please upload at least one image",
    }),
  }).array(),
  isFeatured: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})

export const updateProductSchema = z.object({
  name: z.string().min(1, {
    message: "please enter product name",
  }),
  price: z.number().min(1, {
    message: "please enter product price",
  }),
  categoryId: z.string().min(1, {
    message: "please select a category",
  }),
  colorId: z.string().min(1, {
    message: "please select a color",
  }),
  images: z.object({
    url: z.string().min(1, {
      message: "please upload at least one image",
    }),
  }).array(),
  sizeId: z.string().min(1, {
    message: "please select a size",
  }),
  isFeatured: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})
