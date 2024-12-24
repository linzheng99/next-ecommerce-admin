import { z } from "zod";

export const createSizeSchema = z.object({
  name: z.string().min(1, {
    message: "please enter size name",
  }),
  value: z.string().min(1, {
    message: "please enter size value",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})

export const updateSizeSchema = z.object({
  name: z.string().min(1, {
    message: "please enter size name",
  }),
  value: z.string().min(1, {
    message: "please enter size value",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})
