import { z } from 'zod'

export const createOrderSchema = z.object({
  storeId: z.string().min(1, {
    message: 'please select a store',
  }),
  orderItems: z.object({
    productId: z.string().min(1, {
      message: "please select a product",
    }),
  }).array().min(1, {
    message: "please add at least one item to the order",
  }),
  phone: z.string().min(1, {
    message: 'please enter phone number',
  }),
  address: z.string().min(1, {
    message: 'please enter address',
  }),
})

