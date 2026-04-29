"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGame(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const pointValueRaw = formData.get("pointValue") as string;
  const addToEvent = formData.get("addToEvent") === "on";

  if (!name || name.trim() === "") return;

  const pointValue = parseInt(pointValueRaw, 10);

  try {
    const game = await prisma.game.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        pointValue: Number.isFinite(pointValue) ? pointValue : 0,
      },
    });

    if (addToEvent) {
      const activeEvent = await prisma.event.findFirst({
        orderBy: { id: "desc" },
      });

      if (activeEvent) {
        const lastEventGame = await prisma.eventGames.findFirst({
          where: { eventId: activeEvent.id },
          orderBy: { order: "desc" },
        });

        await prisma.eventGames.create({
          data: {
            eventId: activeEvent.id,
            gameId: game.id,
            order: (lastEventGame?.order ?? 0) + 1,
          },
        });
      }
    }

    revalidatePath("/admin/games");
  } catch (error) {
    console.error("Error creating game:", error);
    throw new Error("Failed to create game");
  }
}

export async function addGameToEvent(gameId: number) {
  try {
    const activeEvent = await prisma.event.findFirst({
      orderBy: { id: "desc" },
    });

    if (!activeEvent) {
      throw new Error("No active event found.");
    }

    const existing = await prisma.eventGames.findFirst({
      where: { eventId: activeEvent.id, gameId },
    });

    if (existing) return;

    const lastEventGame = await prisma.eventGames.findFirst({
      where: { eventId: activeEvent.id },
      orderBy: { order: "desc" },
    });

    await prisma.eventGames.create({
      data: {
        eventId: activeEvent.id,
        gameId,
        order: (lastEventGame?.order ?? 0) + 1,
      },
    });

    revalidatePath("/admin/games");
  } catch (error) {
    console.error("Error adding game to event:", error);
    throw new Error("Failed to add game to event");
  }
}

export async function removeGameFromEvent(eventGamesId: number) {
  try {
    await prisma.eventGames.delete({
      where: { id: eventGamesId },
    });
    revalidatePath("/admin/games");
  } catch (error) {
    console.error("Error removing game from event:", error);
    throw new Error("Failed to remove game from event");
  }
}

export async function deleteGame(gameId: number) {
  try {
    await prisma.game.delete({
      where: { id: gameId },
    });
    revalidatePath("/admin/games");
  } catch (error) {
    console.error("Error deleting game:", error);
    throw new Error("Failed to delete game");
  }
}
