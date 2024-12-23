import { z } from "zod";

export const createBillboardSchema = z.object({
  label: z.string().min(1, {
    message: "please enter billboard label",
  }),
  imageUrl: z.string().min(1, {
    message: "please enter billboard image url",
  }),
  storeId: z.string().min(1, {
    message: "please enter store id",
  }),
})

export const updateBillboardSchema = z.object({
  label: z.string().min(1, {
    message: "please enter billboard label",
  }),
  imageUrl: z.string().min(1, {
    message: "please enter billboard image url",
  }),
  storeId: z.string().min(1, {
    message: "please enter store id",
  }),
})
