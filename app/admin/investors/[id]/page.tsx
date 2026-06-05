export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import InvestorDetail from './InvestorDetail'

export default async function InvestorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [investor, deals] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
      include: {
        dealAccess: { include: { deal: true } },
        docViews: {
          include: { document: { include: { deal: true } } },
          orderBy: { viewedAt: 'desc' },
          take: 20
        }
      }
    }),
    prisma.deal.findMany({ orderBy: { name: 'asc' } })
  ])

  if (!investor) notFound()

  return <InvestorDetail investor={investor} deals={deals} />
}
