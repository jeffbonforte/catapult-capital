import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ dealId: string }> }) {
  const { dealId } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const access = await prisma.dealAccess.findUnique({
    where: { userId_dealId: { userId: user.id, dealId } }
  })
  if (!access || access.isRestricted) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const docs = await prisma.document.findMany({
    where: { dealId },
    include: { views: { where: { userId: user.id }, orderBy: { viewedAt: 'desc' }, take: 1 } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(docs)
}
