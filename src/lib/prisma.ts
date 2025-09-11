import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // logs show in dev & Vercel
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
