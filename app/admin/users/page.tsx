import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminUsersClient from './AdminUsersClient'

export default async function AdminUsersPage() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'SUPER_ADMIN') redirect('/admin')

  const admins = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
    orderBy: { createdAt: 'asc' }
  })

  const lps = await prisma.user.findMany({
    where: { role: 'LP' },
    orderBy: { name: 'asc' }
  })

  return <AdminUsersClient admins={admins} lps={lps} me={me} />
}
