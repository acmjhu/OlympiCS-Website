import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/app/generated/prisma/client';

declare global {
  var prismaGlobal: undefined | PrismaClient
}

const handler: ProxyHandler<object> = {
  get(_target, prop) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error('DATABASE_URL is not set');
    
    if (!globalThis.prismaGlobal) {
      const pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaNeon(pool);
      globalThis.prismaGlobal = new PrismaClient({ adapter });
    }
    
    return (globalThis.prismaGlobal as any)[prop];
  }
};

const prisma = new Proxy({} as PrismaClient, handler) as PrismaClient;
export default prisma;
