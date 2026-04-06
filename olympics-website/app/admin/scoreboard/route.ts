import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ScoreInput {
    teamId: string;
    gameId: string;
    points: number;
}

export async function POINTS(req:NextRequest) {
    try {
        const scores: ScoreInput[] = await req.json();

        const upserts = scores.map((score) =>
        prisma.score.upsert({
            where: {
                teamId_gameId: {
                    teamId: score.teamId,
                    gameId: score.gameId,
                },
            },
            update: { points: score.points}
            create: {
                teamId: score.teamId,
                gameId: score.gameId,
                points: score.points,
            },
            })
        );
        await prisma.$transaction(upserts);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json( {error: "Failed to save scores"}), {status: 500}
    }
}

export async function GET(req:NextRequest) {
    const gameId = req.nextUrl.searchParams.get("gameId");
    if (!gameId) return NextResponse.json([]);
    const scores = await prisma.score.findMany({ where: {gameId}});
    return NextResponse.json(scores);
}

