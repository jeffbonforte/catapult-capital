import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import DealDetail from './DealDetail'

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: {
      access: { include: { user: true } },
      documents: { include: { _count: { select: { views: true } } }, orderBy: { createdAt: 'desc' } },
      updates: { orderBy: { createdAt: 'desc' } }
    }
  })
  if (!deal) notFound()
  return <DealDetail deal={deal} />
}
