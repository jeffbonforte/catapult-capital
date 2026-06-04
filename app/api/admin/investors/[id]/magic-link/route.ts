import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, createMagicLink } from '@/lib/auth'
import { sendMagicLink } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const token = await createMagicLink(user.email)
  if (token) await sendMagicLink(user.email, user.name, token)
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/portal/auth/${token}`
  return NextResponse.json({ success: true, link })
}
