import { clerkMiddleware } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import stores from '@/features/stores/server/route'

const app = new Hono().basePath('/api')

app.use('*', clerkMiddleware())

export const routes = app
  .route('/stores', stores)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
