import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Fetch the most recent event with its games
    const event = await prisma.event.findFirst({
      orderBy: { id: 'desc' },
      include: {
        eventGames: {
          include: {
            game: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'No events found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
