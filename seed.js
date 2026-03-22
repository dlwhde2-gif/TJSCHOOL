const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '1111',
      name: '관리자',
      role: 'admin',
      isApproved: true
    }
  })
  console.log('Admin user seeded successfully!')
}
main()
