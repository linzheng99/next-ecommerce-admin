// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
// nextjs prisma client 最佳实践

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prismadb = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prismadb

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismadb
