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
  const session = await getServerSession();

  if (!session) {
    return [];
  }

  return await db.registration.findMany({
    orderBy: [
      {
        status: "asc",
      },
    ],
  });
}

export default async function ParticipantTable() {
  const data = await fetchRegistrationData();
  return (
    <div className="overflow-scroll">
      <AdminTable data={data} />
    </div>
  );
}
