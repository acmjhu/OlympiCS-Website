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

    const createGame = () =>
      prisma.game.create({
        data: {
          name,
          description: description || null,
          pointValue: pointValue || 0,
        },
      });

    let newGame;
    try {
      newGame = await createGame();
    } catch (error: any) {
      const isDuplicateGamePrimaryKey =
        error?.code === '23505' &&
        String(error?.message || '').includes('Game_pkey');

      if (!isDuplicateGamePrimaryKey) {
        throw error;
      }

      // Repair out-of-sync serial sequence, then retry once.
      await prisma.$executeRawUnsafe(`
        SELECT setval(
          pg_get_serial_sequence('"Game"', 'id'),
          GREATEST((SELECT COALESCE(MAX(id), 0) FROM "Game"), 1)
        )
      `);

      newGame = await createGame();
    }

    // If eventId is provided, create the EventGames relationship
    if (eventId) {
      const createEventGame = () =>
        prisma.eventGames.create({
          data: {
            eventId,
            gameId: newGame.id,
            order: order || 1,
          },
        });

      try {
        await createEventGame();
      } catch (error: any) {
        const isDuplicateEventGamesPrimaryKey =
          error?.code === '23505' &&
          String(error?.message || '').includes('EventGames_pkey');

        if (!isDuplicateEventGamesPrimaryKey) {
          throw error;
        }

        // Repair out-of-sync EventGames sequence, then retry once.
        await prisma.$executeRawUnsafe(`
          SELECT setval(
            pg_get_serial_sequence('"EventGames"', 'id'),
            GREATEST((SELECT COALESCE(MAX(id), 0) FROM "EventGames"), 1)
          )
        `);

        await createEventGame();
      }
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
