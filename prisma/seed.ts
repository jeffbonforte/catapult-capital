import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/catapult' })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create super admin (Jeff Bonforte)
  const jeff = await prisma.user.upsert({
    where: { email: 'jeff@bonforte.com' },
    update: {},
    create: { name: 'Jeff Bonforte', email: 'jeff@bonforte.com', role: 'SUPER_ADMIN' }
  })

  // Create a sample LP
  const jane = await prisma.user.upsert({
    where: { email: 'jane@meridian.com' },
    update: {},
    create: { name: 'Jane Harrington', email: 'jane@meridian.com', role: 'LP' }
  })

  // Create a sample deal
  const deal = await prisma.deal.upsert({
    where: { id: 'deal-jibjab-001' },
    update: {},
    create: {
      id: 'deal-jibjab-001',
      name: 'JibJab Media',
      company: 'JibJab Bros. Studios',
      description: 'Social expression platform enabling users to create personalized video greeting cards.',
      sector: 'Consumer / Media',
      status: 'ACTIVE',
      investDate: new Date('2019-02-12'),
      createdById: jeff.id
    }
  })

  // Give Jane access to the deal
  await prisma.dealAccess.upsert({
    where: { userId_dealId: { userId: jane.id, dealId: deal.id } },
    update: {},
    create: {
      userId: jane.id,
      dealId: deal.id,
      amountInvested: 2500000,
      currentValue: 4100000,
      investDate: new Date('2019-02-12'),
      isRestricted: false,
      accessCode: 'CAP001',
      docusignStatus: 'completed'
    }
  })

  // Sample update
  try {
    await prisma.dealUpdate.create({
      data: {
        dealId: deal.id,
        title: 'Q1 2026 Portfolio Update',
        body: 'JibJab continued strong subscription growth in Q1 2026, with monthly active users up 18% year-over-year. We completed the integration of the new AI personalization engine, which is driving higher engagement and retention. Revenue grew 22% in the quarter driven by premium subscription expansion. The team is executing well against the 2026 plan.'
      }
    })
  } catch {
    // ignore if already exists
  }

  console.log('Seed complete')
  console.log('  Admin: jeff@bonforte.com (SUPER_ADMIN)')
  console.log('  LP: jane@meridian.com (access code: CAP001)')
}

main().finally(() => prisma.$disconnect())
