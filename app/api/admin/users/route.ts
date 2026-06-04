import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const users = await prisma.user.findMany({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } } })
  return NextResponse.json(users)
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentUser()
  if (!admin || admin.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { userId, role } = await req.json()
  const user = await prisma.user.update({ where: { id: userId }, data: { role } })
  return NextResponse.json(user)
}
