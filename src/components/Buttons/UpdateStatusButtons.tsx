"use client";

import { updateRegistrationStatus } from "@/utils/action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpdateStatusButtons({ id, currentStatus }: { id: string, currentStatus: string }) {
  const router = useRouter();
  const handleClick = async (status: string) => {
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
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currentStatus !== "pending"}
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
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currentStatus !== "pending"}
        onClick={() => handleClick("accepted")}
      >
        Accept
      </button>
    </>
  );
}
