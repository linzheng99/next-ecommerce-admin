import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import prismadb from '@/lib/prismadb';

import { createStoreSchema, updateStoreSchema } from '../schemas';

const app = new Hono()
  .post('/',
    zValidator('json', createStoreSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { name } = c.req.valid('json')

      const store = await prismadb.store.create({
        data: {
          name,
          userId: auth.userId,
        },
      })

      return c.json(store)
    })
  .get('/:storeId', async (c) => {
    const auth = getAuth(c)
    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { storeId } = c.req.param()

    const store = await prismadb.store.findUnique({
      where: {
        id: storeId,
        userId: auth.userId,
      },
    })

    if (!store) {
      return c.json({ message: 'Store not found' }, 404)
    }

    return c.json(store)
  })
  .get('/', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const stores = await prismadb.store.findMany({
      where: {
        userId: auth.userId,
      },
    })

    return c.json(stores)
  })
  .patch('/:storeId',
    zValidator('json', updateStoreSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { name } = c.req.valid('json')
      const { storeId } = c.req.param()

      const store = await prismadb.store.update({
        where: {
          id: storeId,
          userId: auth.userId,
        },
        data: { name },
      })

      return c.json(store)
    })
  .delete('/:storeId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { storeId } = c.req.param()

    const store = await prismadb.store.delete({
      where: {
        id: storeId,
        userId: auth.userId,
      },
    })

    return c.json({ id: store.id })
  })

export default app
