import { db } from "@/utils/db";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

async function getParticipantData(id: string) {
    try {
        const participantData = await db.registration.findUnique({
            where: {
                id,
            },
            select: {
                firstname: true,
                lastname: true,
            },
        });
        return participantData;
    } catch (e) {
        return null;
    }
}

export default async function CertificateVerification({
    params,
}: {
    params: { id: string };
}) {
    const participantData = await getParticipantData(params.id);
    return (
        <div className="flex flex-col space-y-2 items-center mt-10">
            {participantData ? (
                <>
                    <CheckCircleIcon className="h-40 w-40 text-green-500" />
                    <h1 className="text-2xl font-bold">
                        คุณ {participantData.firstname} {participantData.lastname} ได้เข้าร่วมกิจกรรมงานเสวนาเปิดรั้วหมอจุฬาฯ
                    </h1>
                </>
            ) : (
                <>
                    <XCircleIcon className="h-40 w-40 text-red-500" />
                    <h1 className="text-2xl font-bold">ไม่พบข้อมูล</h1>
                </>
            )}
        </div>
    )
}
