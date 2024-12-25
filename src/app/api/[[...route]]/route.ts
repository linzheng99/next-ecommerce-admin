import { clerkMiddleware } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import billboards from '@/features/billboards/server/route'
import categories from '@/features/categories/server/route'
import colors from '@/features/colors/server/route'
import sizes from '@/features/sizes/server/route'
import stores from '@/features/stores/server/route'

const app = new Hono().basePath('/api')

app.use('*', clerkMiddleware())

export const routes = app
  .route('/stores', stores)
  .route('/billboards', billboards)
  .route('/categories', categories)
  .route('/sizes', sizes)
  .route('/colors', colors)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
