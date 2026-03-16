import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const data = {
    totalParticipants: await prisma.user.count(),
    totalTeams: await prisma.team.count(),
    acceptedTeams: await prisma.team.count({ where: { status: "ACCEPTED" } }),
    status: "OPEN"
  };
  return NextResponse.json(data);
}
