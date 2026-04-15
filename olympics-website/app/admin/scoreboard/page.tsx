import {auth} from "@/auth";
import {redirect} from "next/navigation";
import AdminScoreboardClient from "./AdminScoreboardClient";
import { getServerSession } from "next-auth";

export default async function AdminScoreboard() {
    const session = await getServerSession(); 
    if (!session || (session.user.email !== "jhuacmofficers@gmail.com" && session.user.email !== "sethwyzy@gmail.com")) {
        redirect("/403");
    } 
    return <AdminScoreboardClient/>
}