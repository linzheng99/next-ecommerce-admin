import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod';

import prismadb from '@/lib/prismadb';

import { createOrderSchema } from '../schemas';

const app = new Hono()
  .get('/:orderId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { orderId } = c.req.param()

    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return c.json({ message: 'Order not found' }, 404)
    }

    return c.json(order)
  })
  .post('/',
    zValidator('json', createOrderSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId, orderItems, phone, address } = await c.req.json()

      // Check if the store belongs to the user
      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })

      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const order = await prismadb.order.create({
        data: { storeId, phone, address, isPaid: false },
      })

      await prismadb.orderItem.createMany({
        data: orderItems.map((item: { productId: string }) => ({
          orderId: order.id,
          productId: item.productId,
        })),
      })

      return c.json(order)
    })
  .get('/',
    zValidator('query', z.object({ storeId: z.string() })),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId } = c.req.query()

      const orders = await prismadb.order.findMany({
        where: {
          storeId: storeId,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return c.json(orders)
    })
  .delete('/:orderId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { orderId } = c.req.param()

    const order = await prismadb.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return c.json({ message: 'Order not found' }, 404)
    }

    // check if the category belongs to the user
    const store = await prismadb.store.findUnique({
      where: { id: order.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deleteOrder = await prismadb.order.delete({
      where: { id: orderId },
    })

    return c.json(deleteOrder)
  })

export default app
