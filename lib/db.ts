// Prisma client for querying the database

import { PrismaClient } from "@prisma/client";

// Prevent new object created every reload
declare global {
  var prisma: PrismaClient | undefined;
}

// Prevent new object created every reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
