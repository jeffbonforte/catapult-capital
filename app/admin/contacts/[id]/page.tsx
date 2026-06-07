export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ContactDetail from './ContactDetail'

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [contact, deals] = await Promise.all([
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
  if (!contact) notFound()
  return <ContactDetail contact={contact} deals={deals} />
}
