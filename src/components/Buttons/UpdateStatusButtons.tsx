"use client";

import { updateRegistrationStatus } from "@/utils/action";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpdateStatusButtons({ id }: { id: string }) {
  const router = useRouter();
  const handleClick = async (status: string) => {
    const session = await getServerSession();
    if (!session) {
      return null;
    }
    const updatedRegistration = await updateRegistrationStatus(id, status);
    if (updatedRegistration) {
      alert(`User is ${status}ed`);
    } else {
      alert(`Error in ${status}ing user`);
    }
    router.push("/admin");
  };
  return (
    <>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => handleClick("rejected")}
      >
        Reject
      </button>
      <Link
        href={`/admin/edit/${id}`}
        prefetch={false}
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
        Edit
      </Link>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={() => handleClick("accepted")}
      >
        Accept
      </button>
    </>
  );
}
