"use server";

// app/register/actions.ts
// ! No longer needed due to admin changes


import  prisma  from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
/*
  id                  Int              @id @default(autoincrement())
  email               String           @unique
  firstName           String
  lastName            String
  tShirtSize          TShirtSize?
  dietaryRestrictions String?
  teamMemberships     TeamMembership[]
*/

export const RegisterSchema = z.object({
  email: z.string().min(1).email(),
  tShirtSize: z.enum(["XS", "S", "M", "L", "XL"]),
  firstName: z.string(), 
  lastName: z.string(),
  dietaryRestrictions: z.string()
})

export async function registerUser(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = RegisterSchema.safeParse(rawData);

    if (!validated.success) {
        return {error: "Invalid fields" };
    }

    const {firstName,lastName, email, tShirtSize, dietaryRestrictions} = validated.data;

    try {
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email, 
                tShirtSize, 
                dietaryRestrictions,
            }
        });
    } catch (e) {
        return {error: "User Already Exists"};
    }
    redirect("/home")
}

