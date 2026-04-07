import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ScoreInput {
    teamId: number;
    eventGamesId: number;
    scoreValue: number;
}

export async function POST(req:NextRequest) {
    try {
        const scores: ScoreInput[] = await req.json();

        const upserts = scores.map((item) =>
        prisma.score.upsert({
            where: {
                teamId_eventGamesId: {
                    teamId: item.teamId,
                    eventGamesId: item.eventGamesId,
                },
            },
            update: { score: item.scoreValue},
            create: {
                teamId: item.teamId,
                eventGamesId: item.eventGamesId,
                score: item.scoreValue,
            },
            })
        );
        await prisma.$transaction(upserts);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json( {error: "Failed to save scores"}, {status: 500});
    }
}

export async function GET(req:NextRequest) {
    const gameId = req.nextUrl.searchParams.get("eventGamesId");
    if (!gameId) return NextResponse.json([]);
    const scores = await prisma.score.findMany({ where: {eventGamesId: parseInt(gameId)}});
    return NextResponse.json(scores);
}

