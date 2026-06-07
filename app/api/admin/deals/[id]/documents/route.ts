import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadToR2 } from '@/lib/r2'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const contentType = req.headers.get('content-type') || ''

  let title: string, type: string, fileUrl: string, fileKey: string, fileSize: number

  if (contentType.includes('application/json')) {
    // Presigned upload flow — file already in R2, just record metadata
    const body = await req.json()
    ;({ title, type, fileUrl, fileKey, fileSize } = body)
  } else {
    // Legacy FormData flow (small files only)
    const formData = await req.formData()
    const file = formData.get('file') as File
    title = formData.get('title') as string
    type = formData.get('type') as string
    if (!file || !title || !type) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const buffer = Buffer.from(await file.arrayBuffer())
    fileKey = `deals/${id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    fileUrl = await uploadToR2(fileKey, buffer, file.type)
    fileSize = file.size
  }

  const doc = await prisma.document.create({
    data: { dealId: id, title, type: type as 'RESEARCH_MEMO' | 'INVESTMENT_DECK' | 'LEGAL_DOC' | 'UPDATE_REPORT' | 'OTHER', fileUrl, fileKey, fileSize }
  })
  return NextResponse.json(doc, { status: 201 })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const docs = await prisma.document.findMany({
    where: { dealId: id },
    include: { _count: { select: { views: true } }, views: { orderBy: { viewedAt: 'desc' }, take: 1 } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(docs)
}
