import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calcMOIC, calcIRR } from '@/lib/calculations'

export async function GET(req: NextRequest, { params }: { params: Promise<{ dealId: string }> }) {
  const { dealId } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const access = await prisma.dealAccess.findUnique({
    where: { userId_dealId: { userId: user.id, dealId } },
    include: { deal: true }
  })
  if (!access || access.isRestricted) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const moic = access.amountInvested && access.currentValue
    ? calcMOIC(access.currentValue, access.amountInvested) : null

  const irr = access.amountInvested && access.currentValue && access.investDate
    ? calcIRR([
        { date: access.investDate, amount: -access.amountInvested },
        { date: new Date(), amount: access.currentValue }
      ]) : null

  return NextResponse.json({ ...access, moic, irr })
}
