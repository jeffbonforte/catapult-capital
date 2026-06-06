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
  const body = await req.json()
  const { userId, role, isLocked, name, email, company } = body
  if (userId === admin.id && (role || isLocked)) return NextResponse.json({ error: 'Cannot modify your own role or lock status' }, { status: 400 })
  const data: any = {}
  if (role !== undefined) data.role = role
  if (isLocked !== undefined) data.isLocked = isLocked
  if (name !== undefined) data.name = name
  if (email !== undefined) data.email = email
  if (company !== undefined) data.company = company ?? null
  const user = await prisma.user.update({ where: { id: userId }, data })
  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentUser()
  if (!admin || admin.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { userId } = await req.json()
  if (userId === admin.id) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
  await prisma.user.delete({ where: { id: userId } })
  return NextResponse.json({ ok: true })
}
