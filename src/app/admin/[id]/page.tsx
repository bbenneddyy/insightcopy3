import { db } from "@/utils/db";
import Image from "next/image";
import UpdateStatusButtons from "@/components/Buttons/UpdateStatusButtons";

export const dynamic = "force-dynamic";

async function getRegisteredUser(id: string) {
  try {
    const registeredUser = await db.registration.findUnique({
      where: {
        id,
      },
    });
    return registeredUser;
  } catch {
    return null;
  }
}

export default async function ApprovePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const registeredUser = await getRegisteredUser(id);
  if (!registeredUser) {
    return (
      <div>
        <p className="text-center p-2 m-2">
          ไม่พบข้อมูล หรือ เกิดข้อผิดพลาดในการทำงาน
        </p>
        <p className="text-center font-bold">404 not found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center items-start min-h-screen pt-16">
        <div className="w-full max-w-md m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {registeredUser.firstname} {registeredUser.lastname}
            </h1>
          </div>
          <div className="text-gray-600 mb-4">
            <p className="mb-2">
              <strong>อีเมล:</strong> {registeredUser.email}
            </p>
            <p className="mb-2">
              <strong>ระดับชั้น:</strong> {registeredUser.education}
            </p>
            <p className="mb-2">
              <strong>สถานะ:</strong> <span className={`${registeredUser.status === "accepted" ? "text-green-500" : registeredUser.status === "rejected" ? "text-red-500" : ""}`}>
                {registeredUser.status}
              </span>
            </p>
            <p>
              <strong>ประเภท:</strong> {registeredUser.site}
              {registeredUser.site === "onsite" && <> (350 บาท)</>}
              {registeredUser.site === "online" && <> (200 บาท)</>}
            </p>
          </div>
          <div className="flex justify-center">
            {registeredUser.id && (
              <Image
                src={`/api/images/${registeredUser.id}.${registeredUser.file_type}`}
                alt="slip"
                className="rounded-md shadow-md"
                width={250}
                height={250}
                unoptimized
              />
            )}
          </div>
          <div className="flex justify-around mt-4">
            <UpdateStatusButtons id={id} currentStatus={registeredUser.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
