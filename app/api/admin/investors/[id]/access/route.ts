import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { dealId, amountInvested, currentValue, investDate, isRestricted, docusignStatus } = await req.json()

  const accessCode = crypto.randomBytes(3).toString('hex').toUpperCase()

  const access = await prisma.dealAccess.upsert({
    where: { userId_dealId: { userId: id, dealId } },
    create: { userId: id, dealId, amountInvested, currentValue, investDate: investDate ? new Date(investDate) : null, isRestricted: isRestricted ?? false, accessCode, docusignStatus },
    update: { amountInvested, currentValue, investDate: investDate ? new Date(investDate) : null, isRestricted: isRestricted ?? false, docusignStatus }
  })
  return NextResponse.json(access)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { dealId, ...updates } = await req.json()
  const access = await prisma.dealAccess.update({
    where: { userId_dealId: { userId: id, dealId } },
    data: updates
  })
  return NextResponse.json(access)
}
