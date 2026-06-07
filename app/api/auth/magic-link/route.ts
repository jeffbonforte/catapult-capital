import { NextRequest, NextResponse } from 'next/server'
import { createMagicLink } from '@/lib/auth'
import { sendMagicLink } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  // Always return success to prevent email enumeration
  if (!user) return NextResponse.json({ success: true })

  const token = await createMagicLink(email.toLowerCase())
  if (token) {
    try {
      await sendMagicLink(user.email, user.name, token)
    } catch (err) {
      console.error('Failed to send magic link email:', err)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
