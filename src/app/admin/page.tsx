import ParticipantTable from "@/components/Tables/ParticipantTable";
import { db } from "@/utils/db";

export const dynamic = "force-dynamic";

async function getStat() {
  // This function is inside admin route, so it is already protected.
  try {
    const userCounts = await db.registration.groupBy({
      by: ['status'],
      _count: true,
    });
    return userCounts
  } catch (e) {
    return null;
  }
}
export default async function Admin() {
  const stats = await getStat();
  return (
    <>
      {stats &&
        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-4 bg-slate-200 rounded-xl">
          <dl className="flex gap-x-8 gap-y-16 text-center">
            {stats.map((stat) => (
              <div key={stat.status} className="mx-auto flex max-w-xs flex-col gap-y-3">
                <dt className="text-base leading-7 text-gray-600 uppercase">{stat.status}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {stat._count}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      }
      <ParticipantTable />
    </>
  );
}
