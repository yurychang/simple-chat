import { encryptPassword } from '@/utils/pwd-encrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'Alice',
        password: await encryptPassword('alice123'),
      },
      {
        username: 'Bob',
        password: await encryptPassword('bob123'),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
