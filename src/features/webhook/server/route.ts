import { Hono } from 'hono'
import Stripe from 'stripe'

import prismadb from '@/lib/prismadb'

const app = new Hono()
  .post('/',
    async (context) => {
      const stripe = new Stripe(process.env.STRIPE_API_KEY as string)
      const signature = context.req.header('stripe-signature')
      try {
        if (!signature) {
          return context.text('', 400)
        }
        const body = await context.req.text()
        const event = await stripe.webhooks.constructEventAsync(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET as string
        )
        const session = event.data.object as Stripe.Checkout.Session
        const address = session?.customer_details?.address
        const addressComponents = [
          address?.line1,
          address?.line2,
          address?.city,
          address?.state,
          address?.postal_code,
        ]
        const addressString = addressComponents.filter(Boolean).join(', ')
        switch (event.type) {
          case 'checkout.session.completed': {
            const order = await prismadb.order.update({
              where: {
                id: session.metadata?.orderId,
              },
              data: {
                isPaid: true,
                address: addressString,
                phone: session.customer_details?.phone || '',
              },
              include: {
                orderItems: true,
              },
            })
            const productIds = order?.orderItems.map((item) => item.productId)
            await prismadb.product.updateMany({
              where: {
                id: {
                  in: productIds,
                },
              },
              data: {
                isArchived: true,
              },
            })
            break
          }
          default:
            break
        }
        return context.text('', 200)
      } catch (err) {
        const errorMessage = `⚠️  Webhook signature verification failed. ${err instanceof Error ? err.message : 'Internal server error'
          }`
        console.log(errorMessage)
        return context.text(errorMessage, 400)
      }
    })
  .get('/', (context) => {
    return context.text('Hello World')
  })

export default app
