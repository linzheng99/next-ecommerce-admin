import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod';

import prismadb from '@/lib/prismadb';

import { createCategorySchema, updateCategorySchema } from '../schemas';

const app = new Hono()
  .post('/',
    zValidator('json', createCategorySchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { name, billboardId, storeId } = await c.req.json()

      // Check if the store belongs to the user
      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })

      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const category = await prismadb.category.create({
        data: { name, billboardId, storeId },
      })

      return c.json(category)
    })
  .get('/:categoryId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { categoryId } = c.req.param()

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    })

    if (!category) {
      return c.json({ message: 'Category not found' }, 404)
    }

    return c.json(category)
  })
  .get('/',
    zValidator('query', z.object({ storeId: z.string() })),
    async (c) => {
      // const auth = getAuth(c)

      // if (!auth?.userId) {
      //   return c.json({ message: 'Unauthorized' }, 401)
      // }

      const { storeId } = c.req.query()

      const categories = await prismadb.category.findMany({
        where: {
          storeId: storeId,
        },
        include: {
          billboard: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return c.json(categories)
    })
    .patch('/:categoryId',
      zValidator('json', updateCategorySchema),
      async (c) => {
        const auth = getAuth(c)
  
        if (!auth?.userId) {
          return c.json({ message: 'Unauthorized' }, 401)
        }
  
        const { name, billboardId, storeId } = await c.req.json()
        const { categoryId } = c.req.param()

        const store = await prismadb.store.findUnique({
          where: { id: storeId, userId: auth.userId },
        })
        if (!store) {
          return c.json({ message: 'Unauthorized' }, 403)
        }
  
        const category = await prismadb.category.findUnique({
          where: { id: categoryId, storeId: storeId },
        })
        if (!category) {
          return c.json({ message: 'Category not found' }, 404)
        }
  
        const updatedCategory = await prismadb.category.update({
          where: { id: categoryId, storeId: storeId },
          data: { name, billboardId },
        })
  
        return c.json(updatedCategory)
      }
    )
  .delete('/:categoryId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { categoryId } = c.req.param()

    const category = await prismadb.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      return c.json({ message: 'Category not found' }, 404)
    }

    // check if the category belongs to the user
    const store = await prismadb.store.findUnique({
      where: { id: category.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deletedCategory = await prismadb.category.delete({
      where: { id: categoryId },
    })

    return c.json(deletedCategory)
  })

export default app
