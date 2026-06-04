import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: {
      access: { include: { user: true } },
      documents: { include: { _count: { select: { views: true } } }, orderBy: { createdAt: 'desc' } },
      updates: { orderBy: { createdAt: 'desc' } }
    }
  })
  if (!deal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(deal)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { name, company, description, sector, status } = await req.json()
  const deal = await prisma.deal.update({
    where: { id },
    data: { name, company, description, sector, status }
  })
  return NextResponse.json(deal)
}
