import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const users = await prisma.user.findMany({
    where: { role: 'LP' },
    include: {
      dealAccess: { include: { deal: true } },
      _count: { select: { docViews: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, email } = await req.json()
  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })

  const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), role: 'LP' } })
  return NextResponse.json(user, { status: 201 })
}
