"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTeam(teamId: number) {
  try {
    await prisma.team.delete({
      where: { id: teamId },
    });
    revalidatePath("/admin/teams");
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Failed to delete team");
  }
}

export async function createTeam(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") return;

  try {
    const activeEvent = await prisma.event.findFirst({
      orderBy: { id: "desc" }
    });

    if (!activeEvent) {
      throw new Error("Cannot create team: No active event found in database.");
    }

    const teamCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    await prisma.team.create({
      data: {
        name: name.trim(),
        status: "PENDING",
        code: teamCode,
        event: {
          connect: { id: activeEvent.id }
        }
      },
    });

    revalidatePath("/admin/teams");
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team");
  }
}
