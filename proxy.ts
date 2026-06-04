import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret')

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPortal = pathname.startsWith('/portal') && !pathname.startsWith('/portal/auth') && pathname !== '/portal/login'
  const isAdmin = pathname.startsWith('/admin')

  if (!isPortal && !isAdmin) return NextResponse.next()

  const token = request.cookies.get('session')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/portal/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, secret) as { payload: { userId: string } }
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.userId)
    return response
  } catch {
    return NextResponse.redirect(new URL('/portal/login', request.url))
  }
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*']
}
