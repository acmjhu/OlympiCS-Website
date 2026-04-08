import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    totalParticipants: await prisma.user.count(),
    totalTeams: await prisma.team.count(),
    acceptedTeams: await prisma.team.count({ where: { status: "ACCEPTED" } }),
    status: "OPEN"
  };
  return NextResponse.json(data);
}
