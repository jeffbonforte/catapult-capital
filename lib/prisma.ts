import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global { var _prismaClient: PrismaClient | undefined }

function createClient(): PrismaClient {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

// Lazy proxy — no DB connection is created at import/build time.
// The real client is created on the first actual query call.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    if (!global._prismaClient) {
      global._prismaClient = createClient()
    }
    const val = (global._prismaClient as any)[prop]
    return typeof val === 'function' ? val.bind(global._prismaClient) : val
  },
})
