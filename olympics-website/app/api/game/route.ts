import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET: Fetch all games
export async function GET() {
  try {
    const games = await prisma.game.findMany();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}

// POST: Add a new game
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, date, location } = await req.json();
    const game = await prisma.game.create({
      data: { name, date: new Date(date), location },
    });
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add game' }, { status: 500 });
  }
}