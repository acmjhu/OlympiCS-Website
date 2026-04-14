import {auth} from "@/auth";
import {redirect} from "next/navigation";
import AdminScoreboardClient from "./AdminScoreboardClient";
import { getServerSession } from "next-auth";

export default async function AdminScoreboard() {
    const session = await getServerSession(); 
    if (!session || session.user.role !== "admin") {
        redirect("/403");
    }
    return <AdminScoreboardClient/>
}