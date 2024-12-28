import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type Stripe from 'stripe'

import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'

import { checkoutSchema } from '../schemas'

const app = new Hono()
  .post('/:storeId',
    zValidator('json', checkoutSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId } = c.req.param()
      const { productIds } = await c.req.json()

      // 检查 productIds 是否有效
      if (!productIds || productIds.length === 0) {
        return c.json({ message: 'No products selected' }, 400)
      }

      // 获取产品信息
      const products = await prismadb.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      })

      // 检查是否找到了任何产品
      if (products.length === 0) {
        return c.json({ message: 'No valid products found' }, 404)
      }

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

      products.forEach((product) => {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: 'USD',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price.toNumber() * 100,
          },
        })
      })

      const order = await prismadb.order.create({
        data: {
          storeId,
          isPaid: false,
          orderItems: {
            create: productIds.map((productId: string) => ({
              product: {
                connect: {
                  id: productId,
                },
              },
            })),
          },
        },
      })

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/shop/cart?success=true`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/shop/cart?canceled=true`,
        metadata: {
          orderId: order.id,
        },
      })

      return c.json({ url: session.url })
    })

export default app
