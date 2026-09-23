import "server-only";
import { Pool } from "pg";
import { assertLocalDemo } from "./demo";

const globalForPg = globalThis as typeof globalThis & { nutriPool?: Pool };

export function db() {
  assertLocalDemo();
  if (!process.env.DATABASE_URL) {
    throw new Error("Falta DATABASE_URL. Copiá .env.example a .env.local.");
  }
  if (!globalForPg.nutriPool) {
    globalForPg.nutriPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
    });
  }
  return globalForPg.nutriPool;
}
