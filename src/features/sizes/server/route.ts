import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod';

import prismadb from '@/lib/prismadb';

import { createSizeSchema, updateSizeSchema } from '../schemas';

const app = new Hono()
  .post('/',
    zValidator('json', createSizeSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { name, value, storeId } = await c.req.json()

      // Check if the store belongs to the user
      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })

      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const size = await prismadb.size.create({
        data: { name, value, storeId },
      })

      return c.json(size)
    })
  .get('/:sizeId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { sizeId } = c.req.param()

    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    })

    if (!size) {
      return c.json({ message: 'Size not found' }, 404)
    }

    return c.json(size)
  })
  .get('/',
    zValidator('query', z.object({ storeId: z.string() })),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId } = c.req.query()

      const sizes = await prismadb.size.findMany({
        where: {
          storeId: storeId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return c.json(sizes)
    })
    .patch('/:sizeId',
      zValidator('json', updateSizeSchema),
      async (c) => {
        const auth = getAuth(c)
  
        if (!auth?.userId) {
          return c.json({ message: 'Unauthorized' }, 401)
        }
  
        const { name, value, storeId } = await c.req.json()
        const { sizeId } = c.req.param()

        const store = await prismadb.store.findUnique({
          where: { id: storeId, userId: auth.userId },
        })
        if (!store) {
          return c.json({ message: 'Unauthorized' }, 403)
        }
  
        const size = await prismadb.size.findUnique({
          where: { id: sizeId, storeId: storeId },
        })
        if (!size) {
          return c.json({ message: 'Size not found' }, 404)
        }
  
        const updatedSize = await prismadb.size.update({
          where: { id: sizeId, storeId: storeId },
          data: { name, value },
        })
  
        return c.json(updatedSize)
      }
    )
  .delete('/:sizeId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { sizeId } = c.req.param()

    const size = await prismadb.size.findUnique({
      where: { id: sizeId },
    })

    if (!size) {
      return c.json({ message: 'Size not found' }, 404)
    }

    // check if the category belongs to the user
    const store = await prismadb.store.findUnique({
      where: { id: size.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deleteSize = await prismadb.size.delete({
      where: { id: sizeId },
    })

    return c.json(deleteSize)
  })

export default app
