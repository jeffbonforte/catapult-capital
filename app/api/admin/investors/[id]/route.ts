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
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      dealAccess: { include: { deal: true } },
      docViews: {
        include: { document: { include: { deal: true } } },
        orderBy: { viewedAt: 'desc' },
        take: 50
      }
    }
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const data = await req.json()
  const user = await prisma.user.update({ where: { id }, data: { name: data.name, email: data.email } })
  return NextResponse.json(user)
}
