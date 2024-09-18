import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-600 sm:text-5xl">404</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ</p>
                <div className="mt-10 flex items-center justify-center">
                    <Link
                        href="/"
                        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>
        </main>
    );
}