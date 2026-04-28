import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id);
    const body = await request.json();

    const { name, description, pointValue } = body;

    if (!name && description === undefined && pointValue === undefined) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    // Neon HTTP adapter doesn't support the implicit transaction used when
    // `include` accompanies an update, so split into update + findUnique.
    await prisma.game.update({
      where: { id: gameId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description: description || null }),
        ...(pointValue !== undefined && { pointValue }),
      },
    });

    const updatedGame = await prisma.game.findUnique({ where: { id: gameId } });
    return NextResponse.json(updatedGame, { status: 200 });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameId = parseInt(id);

    // Delete scores linked to this game's EventGames first to satisfy FK constraints.
    await prisma.score.deleteMany({
      where: {
        eventGames: {
          gameId,
        },
      },
    });

    // Delete associated EventGames records.
    await prisma.eventGames.deleteMany({
      where: { gameId }
    });

    // Delete the game
    await prisma.game.delete({ where: { id: gameId } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
