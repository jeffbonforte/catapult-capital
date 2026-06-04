import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicLink, createSession } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const user = await verifyMagicLink(token)
  if (!user) {
    return NextResponse.redirect(new URL('/portal/login?error=invalid', req.url))
  }
  await createSession(user.id)
  return NextResponse.redirect(new URL('/portal/deals', req.url))
}
