import {auth} from "@/auth";
import {redirect} from "next/navigation";
import AdminScoreboardClient from "./AdminScoreboardClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { DynamicServerError } from "next/dist/client/components/hooks-server-context";
import { IdCard } from "lucide-react";

export default async function AdminScoreboard() {
    const session = await getServerSession(authOptions); 
    if (!session || (session.user.email !== "jhuacmofficers@gmail.com" && session.user.email !== "sethwyzy@gmail.com")) {
        redirect("/403");
    } 
    const currentEvent = await prisma.event.findFirst({
        orderBy: {year : 'desc'},
        include: {
            teams: true,
            eventGames: {
                include: {game: true}
            }
        }
    });
    if (!currentEvent) {
        return <div className="p-8 text-white">No active event found in the databse</div>
    }

    const dynamicGamesList = currentEvent.eventGames.map((eg) => ({
        id: eg.id.toString(), 
        label: eg.game.name, 
        teams: currentEvent.teams.map(team=> ({
            id: team.id, 
            name: team.name
        }))
    }));

    return <AdminScoreboardClient games={dynamicGamesList}/>
}
