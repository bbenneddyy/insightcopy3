import { db } from "@/utils/db";
import Link from "next/link";

interface IRegistration {
    id: string;
    education: string;
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    reason: string | null;
    status: string;
}

async function getRegistration(): Promise<IRegistration[]> {
    const registrations = await db.registration.findMany({
        orderBy: [
            {
                status: "asc",
            },
        ],
    });
    return registrations;
}

export default async function FilterParticipantsList({ query, status }: { query: string, status: string }) {
    const participants = await getRegistration()
    const searchedParticipants = Array.isArray(participants) ? participants.filter((participant) => {
        return participant.firstname.toLowerCase().includes(query.toLowerCase());
    }) : [];
    const searchAndFiltered = searchedParticipants.filter((participant) => { return participant.status.includes(status); })
    return (
        <div>
            {Array.isArray(participants) && participants.length === 0 && (
                <p className="w-1/2 m-2 border-2 mx-auto rounded-md p-2 bg-slate-100">No Participants</p>
            )}
            <div>
                {Array.isArray(participants) && searchAndFiltered.map((participant) => (
                    <Link
                        href={`/admin/${participant.id}`}
                        key={participant.id}
                        prefetch={false}
                        className="flex justify-center"
                    >
                        <div className="w-1/2 m-2 border-2 rounded-md p-2 bg-slate-100 flex justify-between">
                            <p>{participant.firstname}</p>
                            <p className={`ml-4 font-bold ${participant.status === 'accepted' ? 'text-green-500' : participant.status === 'rejected' ? 'text-red-700' : 'text-gray-500'}`}>{participant.status}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
