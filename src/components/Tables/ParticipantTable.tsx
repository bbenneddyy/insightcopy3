import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import AdminTable from "./AdminTable";

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
  site: string;
  allergy: string | null;
  created_at: Date | null;
}

async function fetchRegistrationData(): Promise<IRegistration[]> {
  try {
    const session = await getServerSession();
    if (!session) {
      return [];
    }

    return await db.registration.findMany({
      orderBy: [{ status: "asc" }],
    });
  } catch (error) {
    console.error("Error fetching registration data:", error);
    return [];
  }
}


export default async function ParticipantTable() {
  const data = await fetchRegistrationData();
  return (
    <div className="overflow-scroll">
      <AdminTable data={data} />
    </div>
  );
}
