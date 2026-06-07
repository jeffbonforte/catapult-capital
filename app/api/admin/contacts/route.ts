import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, email, company, role } = await req.json()
  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  const validRoles = ['LP', 'CONTACT', 'ADMIN', 'SUPER_ADMIN']
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), company: company || null, role: validRoles.includes(role) ? role : 'LP' }
  })
  return NextResponse.json(user, { status: 201 })
}
