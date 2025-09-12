// src/lib/logger.ts
import { prisma } from './prisma';
import type { Prisma } from '@prisma/client';

type LogInput = {
  method: string;
  path: string;
  query: Record<string, unknown>;
  headers: Record<string, string>;
  body?: unknown;
};

export async function logRequest(input: LogInput) {
  let bodyStr: string | undefined;
  try {
    if (input.body !== undefined) {
      const s = JSON.stringify(input.body);
      bodyStr = s.length > 10_000 ? s.slice(0, 10_000) + '…(truncated)' : s;
    }
  } catch {
    bodyStr = String(input.body);
  }

  await prisma.requestLog.create({
    data: {
      method: input.method,
      path: input.path,
      // 👇 key change: use Prisma.InputJsonValue
      query: input.query as Prisma.InputJsonValue,
      headers: input.headers as Prisma.InputJsonValue,
      body: bodyStr,
    },
  });
}
