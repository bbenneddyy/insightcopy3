import ParticipantTable from "@/components/Tables/ParticipantTable";

export const dynamic = "force-dynamic";

export default async function Admin() {
  return (
    <>
      <ParticipantTable />
    </>
  );
}
