import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: Promise<{ dealId: string, docId: string }> }) {
  const { docId } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.documentView.create({ data: { userId: user.id, documentId: docId } })
  return NextResponse.json({ success: true })
}
