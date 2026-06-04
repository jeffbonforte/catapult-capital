import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const deals = await prisma.deal.findMany({
    include: { _count: { select: { access: true, documents: true, updates: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(deals)
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, company, description, sector, investDate } = await req.json()
  const deal = await prisma.deal.create({
    data: { name, company, description, sector, investDate: investDate ? new Date(investDate) : null, createdById: admin.id }
  })
  return NextResponse.json(deal, { status: 201 })
}
