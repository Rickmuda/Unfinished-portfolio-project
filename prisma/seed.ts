import { PrismaClient } from '@prisma/client';

const seedData = [
  {
    username: 'rick_muda',
    password: 'Rick23042002',
    email: 'rickambergen25@gmail.com',
    is_admin: 1,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const user of seedData) {
      await prisma.users.create({
        data: user,
      });
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
