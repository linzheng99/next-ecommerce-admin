import { Hono } from "hono"

import prismadb from "@/lib/prismadb"

const app = new Hono()
  .get("/", async (c) => {
    const categories = await prismadb.category.findMany({
      where: {
        storeId: c.req.param("storeId"),
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return c.json(categories)
  })

export default app
