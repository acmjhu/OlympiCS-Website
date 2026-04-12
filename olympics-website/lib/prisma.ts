import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma/client";

declare global {
    var prismaGlobal: undefined | PrismaClient
}

const handler: ProxyHandler<object> = {
    get(_target, prop) {
        const databaseUrl = process.env.DATABASE_URL
        if (!databaseUrl) throw new Error('DATABASE_URL is not set')
        if (!globalThis.prismaGlobal) {
            const adapter = new PrismaNeonHttp(databaseUrl, {})
            globalThis.prismaGlobal = new PrismaClient({ adapter })
        }
        return (globalThis.prismaGlobal as any)[prop]
    }
}

const prisma = new Proxy({} as PrismaClient, handler) as PrismaClient
export default prisma
