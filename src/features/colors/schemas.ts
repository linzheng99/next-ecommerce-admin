import { z } from "zod";

export const createColorSchema = z.object({
  name: z.string().min(1, {
    message: "please enter color name",
  }),
  value: z.string().regex(/^#([0-9a-fA-F]{6})$/, {
    message: "please enter a valid hex color code",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})

export const updateColorSchema = z.object({
  name: z.string().min(1, {
    message: "please enter color name",
  }),
  value: z.string().min(1, {
    message: "please enter color value",
  }),
  storeId: z.string().min(1, {
    message: "please select a store",
  }),
})
