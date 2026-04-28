import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// DELETE: Delete a game by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.game.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Game deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}