import {auth} from "@/auth";
import {redirect} from "next/navigation";
import AdminScoreboardClient from "./AdminScoreboardClient";

export default async function AdminScoreboard() {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
        redirect("/403");
    }
    return <AdminScoreboardClient/>
}