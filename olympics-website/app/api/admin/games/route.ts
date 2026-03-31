import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, description, pointValue, eventId, order } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Game name is required' },
        { status: 400 }
      );
    }

    const newGame = await prisma.game.create({
      data: {
        name,
        description: description || null,
        pointValue: pointValue || 0,
      }
    });

    // If eventId is provided, create the EventGames relationship
    if (eventId) {
      await prisma.eventGames.create({
        data: {
          eventId,
          gameId: newGame.id,
          order: order || 1,
        }
      });
    }

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}
