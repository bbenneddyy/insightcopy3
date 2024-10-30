import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import { webStatus } from "@/utils/config";
import { unstable_noStore as noStore } from "next/cache";
export default function Home() {
  noStore();
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-14 -z-10">
          <div className="mx-auto max-w-3xl py-12 sm:py-12 lg:py-12">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <a
                  href="https://www.facebook.com/MDCUmedcamp"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-semibold text-green-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  อ่านเพิ่มเติม <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold leading-normal tracking-tight text-gray-900">
                เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                กิจกรรมเสวนาจากรุ่นพี่คณะแพทยศาสตร์
                จุฬาลงกรณ์มหาวิทยาลัยให้นักเรียนมัธยมศึกษาและผู้ปกครอง
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/register"
                  className={webStatus === "open" ? "rounded-md bg-green-600 px-6 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" : "rounded-md bg-slate-200 px-6 py-2.5 text-xl text-gray-300 font-semibold pointer-events-none"}
                >
                  {webStatus === "open" ? 'สมัคร' : 'ปิดรับสมัคร'}
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#16a34a] to-[#22c55e]  opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
