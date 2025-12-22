import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Attempting to create PostCategory enum...");
        // PostgreSQL specific raw SQL to create the enum if it doesn't exist
        await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PostCategory') THEN
              CREATE TYPE "PostCategory" AS ENUM ('NEW', 'IMPROVED', 'FIXED');
          END IF;
      END
      $$;
    `);
        console.log("Successfully created PostCategory enum.");
    } catch (e) {
        console.error("Error creating enum:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
