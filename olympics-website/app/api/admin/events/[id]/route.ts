import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    const body = await request.json();

    const { name, year, registration } = body;

    if (!name && year === undefined && registration === undefined) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    await prisma.event.update({
      where: { id: eventId },
      data: {
        ...(name && { name }),
        ...(year !== undefined && { year }),
        ...(registration !== undefined && { registration }),
      },
    });

    // Fetch separately — Neon HTTP adapter doesn't support the implicit
    // transaction that Prisma uses when `include` is combined with `update`.
    const updatedEvent = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        eventGames: {
          include: { game: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}
