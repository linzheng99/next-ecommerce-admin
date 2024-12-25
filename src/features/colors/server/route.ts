import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod';

import prismadb from '@/lib/prismadb';

import { createColorSchema, updateColorSchema } from '../schemas';

const app = new Hono()
  .post('/',
    zValidator('json', createColorSchema),
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

      const color = await prismadb.color.create({
        data: { name, value, storeId },
      })

      return c.json(color)
    })
  .get('/:colorId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { colorId } = c.req.param()

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    })

    if (!color) {
      return c.json({ message: 'Color not found' }, 404)
    }

    return c.json(color)
  })
  .get('/',
    zValidator('query', z.object({ storeId: z.string() })),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId } = c.req.query()

      const colors = await prismadb.color.findMany({
        where: {
          storeId: storeId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return c.json(colors)
    })
    .patch('/:colorId',
      zValidator('json', updateColorSchema),
      async (c) => {
        const auth = getAuth(c)
  
        if (!auth?.userId) {
          return c.json({ message: 'Unauthorized' }, 401)
        }
  
        const { name, value, storeId } = await c.req.json()
        const { colorId } = c.req.param()

        const store = await prismadb.store.findUnique({
          where: { id: storeId, userId: auth.userId },
        })
        if (!store) {
          return c.json({ message: 'Unauthorized' }, 403)
        }
  
        const color = await prismadb.color.findUnique({
          where: { id: colorId, storeId: storeId },
        })
        if (!color) {
          return c.json({ message: 'Color not found' }, 404)
        }
  
        const updatedColor = await prismadb.color.update({
          where: { id: colorId, storeId: storeId },
          data: { name, value },
        })
  
        return c.json(updatedColor)
      }
    )
  .delete('/:colorId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { colorId } = c.req.param()

    const color = await prismadb.color.findUnique({
      where: { id: colorId },
    })

    if (!color) {
      return c.json({ message: 'Color not found' }, 404)
    }

    // check if the category belongs to the user
    const store = await prismadb.store.findUnique({
      where: { id: color.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deleteColor = await prismadb.color.delete({
      where: { id: colorId },
    })

    return c.json(deleteColor)
  })

export default app
