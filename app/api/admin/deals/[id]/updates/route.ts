import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { title, body } = await req.json()
  const update = await prisma.dealUpdate.create({ data: { dealId: id, title, body } })
  return NextResponse.json(update, { status: 201 })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { updateId, title, body } = await req.json()
  const update = await prisma.dealUpdate.update({ where: { id: updateId }, data: { title, body } })
  return NextResponse.json(update)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { updateId } = await req.json()
  await prisma.dealUpdate.delete({ where: { id: updateId } })
  return NextResponse.json({ ok: true })
}
