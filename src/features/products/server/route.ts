import { getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod';

import prismadb from '@/lib/prismadb';

import { createProductSchema, updateProductSchema } from '../schemas';

const app = new Hono()
  .post('/',
    zValidator('json', createProductSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived, storeId } = await c.req.json()

      // Check if the store belongs to the user
      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })

      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const product = await prismadb.product.create({
        data: {
          name,
          price,
          categoryId,
          colorId,
          sizeId,
          images: {
            createMany: {
              data: [...images.map((image: { url: string }) => image)],
            },
          },
          isFeatured,
          isArchived,
          storeId
        },
      })

      return c.json(product)
    })
  .get('/:productId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { productId } = c.req.param()

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
      },
    })

    if (!product) {
      return c.json({ message: 'Product not found' }, 404)
    }

    return c.json(product)
  })
  .get('/',
    zValidator('query', z.object({
      storeId: z.string(),
      categoryId: z.string().optional(),
      colorId: z.string().optional(),
      sizeId: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isArchived: z.boolean().optional(),
      name: z.string().optional()
    })),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId, categoryId, colorId, sizeId, isFeatured, isArchived, name } = c.req.query()

      const whereConditions = {
        storeId: storeId,
        ...(name && { name }),
        ...(categoryId && { categoryId }),
        ...(colorId && { colorId }),
        ...(sizeId && { sizeId }),
        ...(isFeatured && { isFeatured: true }),
        ...(isArchived && { isArchived: true }),
      };

      const products = await prismadb.product.findMany({
        where: whereConditions,
        include: {
          category: true,
          color: true,
          size: true,
          images: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return c.json(products)
    })
  .patch('/:productId',
    zValidator('json', updateProductSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images,
        isFeatured,
        isArchived,
        storeId
      } = await c.req.json()
      const { productId } = c.req.param()

      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })
      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const product = await prismadb.product.findUnique({
        where: { id: productId, storeId: storeId },
      })
      if (!product) {
        return c.json({ message: 'Product not found' }, 404)
      }

      await prismadb.product.update({
        where: { id: productId, storeId: storeId },
        data: {
          name,
          price,
          categoryId,
          colorId,
          sizeId,
          images: {
            deleteMany: {},
          },
          isFeatured,
          isArchived
        },
      })

      const updatedProduct = await prismadb.product.update({
        where: { id: productId, storeId: storeId },
        data: {
          images: {
            createMany: {
              data: images.map((image: { url: string }) => image),
            },
          },
        },
      })

      return c.json(updatedProduct)
    }
  )
  .delete('/:productId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { productId } = c.req.param()

    const product = await prismadb.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return c.json({ message: 'Product not found' }, 404)
    }

    // check if the category belongs to the user
    const store = await prismadb.store.findUnique({
      where: { id: product.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deletedProduct = await prismadb.product.delete({
      where: { id: productId },
    })

    return c.json(deletedProduct)
  })

export default app
