import Link from "next/link";
import Image from "next/image";
import SignOutButton from "../Buttons/SignOutButton";
import { eventNumber } from "@/utils/config";

export default function AdminNavbar() {
  return (
    <header className="flex items-center justify-between px-8 py-2 space-x-6 bg-gray-100">
      <Link className="flex items-center" href="/admin">
        <Image
          src="/images/chulalogo.png"
          alt="Chula Logo"
          width={50}
          height={50}
        />
        <h1 className="font-bold text-xl mx-6 hidden md:block">
          Admin เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ {eventNumber}
        </h1>
      </Link>
      <ul className="flex text-center space-x-6">
        <li>
          <Link
            href="/admin"
            className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition block"
          >
            ผู้สมัครทั้งหมด
          </Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </header>
  );
}
