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
    await prisma.team.create({
      data: {
        name: name.trim(),
        status: "PENDING", 
      },
    });
    revalidatePath("/admin/teams");
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team");
  }
}
