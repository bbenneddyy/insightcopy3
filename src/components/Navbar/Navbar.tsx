import Link from "next/link";
import Image from "next/image";
import { eventNumber, webStatus } from "@/utils/config";
import { unstable_noStore as noStore } from "next/cache";

export default function Navbar() {
  noStore();
  return (
    <header className="flex items-center justify-between px-8 py-2 space-x-6 bg-gray-100">
      <Link className="flex items-center" href="/">
        <Image
          src="/images/chulalogo.png"
          alt="Chula Logo"
          width={50}
          height={50}
        />
        <h1 className="font-bold text-xl mx-6 hidden md:block">
          เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ {eventNumber}
        </h1>
      </Link>
      <ul className="flex text-center space-x-6">
        <li className="hidden md:block">
          <Link
            href="/"
            className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition ease-in-out z-10"
          >
            หน้าหลัก
          </Link>
        </li>
        {webStatus === "open" && (
          <li>
            <Link
              href="/register"
              className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition ease-in-out z-10"
            >
              สมัคร
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/user"
            className="border-4 p-2 rounded-lg bg-gray-200 hover:border-slate-300 transition ease-in-out z-10"
          >
            เข้าสู่ระบบ
          </Link>
        </li>
      </ul>
    </header>
  );
}
