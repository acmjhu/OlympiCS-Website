import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

type TeamWithScores = Prisma.TeamGetPayload<{
  select: {
    id: true;
    name: true;
    scores: {
      select: {
        score: true;
        eventGames: {
          select: {
            game: {
              select: {
                name: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export async function GET() {
  try {
    // Get the most recent event by year
    const currentEvent = await prisma.event.findFirst({
      orderBy: { year: "desc" },
    });

    if (!currentEvent) {
      return NextResponse.json({ error: "No event found" }, { status: 404 });
    }

    // Get all accepted teams for the current event, with their scores
    const teams = await prisma.team.findMany({
      where: {
        eventId: currentEvent.id,
        status: "ACCEPTED",
      },
      select: {
        id: true,
        name: true,
        scores: {
          select: {
            score: true,
            eventGames: {
              select: {
                game: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Aggregate total score per team
    const scoreboard = (teams as TeamWithScores[])
      .map((team: TeamWithScores) => ({
        id: team.id,
        name: team.name,
        totalScore: team.scores.reduce(
          (sum: number, s: TeamWithScores["scores"][number]) => sum + s.score,
          0
        ),
        scores: team.scores.map((s: TeamWithScores["scores"][number]) => ({
          game: s.eventGames.game.name,
          score: s.score,
        })),
      }))
      .sort(
        (a: { totalScore: number }, b: { totalScore: number }) =>
          b.totalScore - a.totalScore
      );

    return NextResponse.json({
      event: {
        id: currentEvent.id,
        name: currentEvent.name,
        year: currentEvent.year,
      },
      scoreboard,
    });
  } catch (error) {
    console.error("Scoreboard fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
