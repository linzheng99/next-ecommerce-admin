import { z } from "zod";

export const checkoutSchema = z.object({
  productIds: z.array(z.string()).min(1, {
    message: "please select at least one product",
  }),
})
