import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 })

  const access = await prisma.dealAccess.findFirst({
    where: { accessCode: code.toUpperCase(), isRestricted: false },
    include: { user: true }
  })
  if (!access) return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })

  await prisma.user.update({ where: { id: access.userId }, data: { lastLoginAt: new Date() } })
  await createSession(access.userId)
  return NextResponse.json({ success: true, dealId: access.dealId })
}
