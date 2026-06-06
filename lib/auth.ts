import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'
import crypto from 'crypto'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret')

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/'
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { userId: string }
  } catch { return null }
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null
  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  if (!user || user.isLocked) return null
  return user
}

export async function createMagicLink(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null
  const token = crypto.randomBytes(32).toString('hex')
  await prisma.magicLink.create({
    data: { userId: user.id, token, expiresAt: new Date(Date.now() + 15 * 60 * 1000) }
  })
  return token
}

export async function verifyMagicLink(token: string) {
  const link = await prisma.magicLink.findUnique({
    where: { token }, include: { user: true }
  })
  if (!link || link.usedAt || link.expiresAt < new Date()) return null
  if (link.user.isLocked) return null
  await prisma.magicLink.update({ where: { id: link.id }, data: { usedAt: new Date() } })
  await prisma.user.update({ where: { id: link.userId }, data: { lastLoginAt: new Date() } })
  return link.user
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
