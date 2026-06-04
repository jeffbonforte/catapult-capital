import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const access = await prisma.dealAccess.findMany({
    where: { userId: user.id, isRestricted: false },
    include: { deal: true }
  })
  return NextResponse.json(access)
}
