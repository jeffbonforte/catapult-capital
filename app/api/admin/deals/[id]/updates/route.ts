import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const { title, body } = await req.json()
  const update = await prisma.dealUpdate.create({ data: { dealId: id, title, body } })
  return NextResponse.json(update, { status: 201 })
}
