import EditInfoForm from "@/components/Forms/EditInfoForm";
import { db } from "@/utils/db";

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

export default async function Edit(props: { params: Promise<{ id: string }>; }) {
    const params = await props.params;
    const registeredUser = await getRegisteredUser(params.id);
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
            <EditInfoForm id={params.id} registeredUser={registeredUser} />
    )
}
