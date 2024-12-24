import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, {
    message: "please enter category name",
  }),
  billboardId: z.string().min(1, {
    message: "please select a billboard",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})

export const updateCategorySchema = z.object({
  name: z.string().min(1, {
    message: "please enter category name",
  }),
  billboardId: z.string().min(1, {
    message: "please select a billboard",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})
