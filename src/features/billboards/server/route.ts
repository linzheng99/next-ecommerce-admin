import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

import { createBillboardSchema, updateBillboardSchema } from "../schemas";

const app = new Hono()
  .get('/:billboardId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { billboardId } = c.req.param()

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    })

    if (!billboard) {
      return c.json({ message: 'Billboard not found' }, 404)
    }

    return c.json(billboard)
  })
  .post('/',
    zValidator('json', createBillboardSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { label, imageUrl, storeId } = await c.req.json()

      // Check if the store belongs to the user
      const store = await prismadb.store.findUnique({
        where: { id: storeId, userId: auth.userId },
      })

      console.log(store, auth.userId)

      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const billboard = await prismadb.billboard.create({
        data: { label, imageUrl, storeId },
      })

      return c.json(billboard)
    })
  .patch('/:billboardId',
    zValidator('json', updateBillboardSchema),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { label, imageUrl } = await c.req.json()
      const { billboardId } = c.req.param()

      const billboard = await prismadb.billboard.findUnique({
        where: { id: billboardId },
      })
      if (!billboard) {
        return c.json({ message: 'Billboard not found' }, 404)
      }

      const store = await prismadb.store.findUnique({
        where: { id: billboard.storeId, userId: auth.userId },
      })
      if (!store) {
        return c.json({ message: 'Unauthorized' }, 403)
      }      

      const values: Record<string, string> = {}

      if (imageUrl) values.imageUrl = imageUrl
      if (label) values.label = label

      const updatedBillboard = await prismadb.billboard.update({
        where: { id: billboardId },
        data: values,
      })

      return c.json(updatedBillboard)
    }
  )
  .get('/',
    zValidator('query', z.object({ storeId: z.string() })),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const { storeId } = c.req.query()

      const billboards = await prismadb.billboard.findMany({
        where: {
          storeId: storeId,
        },
      })

      return c.json(billboards)
    })
  .delete('/:billboardId', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { billboardId } = c.req.param()

    const billboard = await prismadb.billboard.findUnique({
      where: { id: billboardId },
    })

    if (!billboard) {
      return c.json({ message: 'Billboard not found' }, 404)
    }

    const store = await prismadb.store.findUnique({
      where: { id: billboard.storeId, userId: auth.userId },
    })

    if (!store) {
      return c.json({ message: 'Unauthorized' }, 403)
    }

    const deletedBillboard = await prismadb.billboard.delete({
      where: { id: billboardId },
    })

    return c.json(deletedBillboard)
  })

export default app
