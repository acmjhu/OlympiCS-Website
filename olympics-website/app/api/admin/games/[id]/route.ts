import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = parseInt(params.id);
    const body = await request.json();

    const { name, description, pointValue } = body;

    if (!name && description === undefined && pointValue === undefined) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description: description || null }),
        ...(pointValue !== undefined && { pointValue }),
      }
    });

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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = parseInt(params.id);

    // Delete associated EventGames records first
    await prisma.eventGames.deleteMany({
      where: { gameId }
    });

    // Delete the game
    const deletedGame = await prisma.game.delete({
      where: { id: gameId }
    });

    return NextResponse.json(
      { message: "Game deleted successfully", game: deletedGame },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
