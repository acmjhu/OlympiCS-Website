import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma/client";

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL environment variable is not set or is empty. Please configure it before starting the application."
    );
  }

  const adapter = new PrismaNeonHttp(databaseUrl, {});
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
