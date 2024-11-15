'use client';

import { verifyCodeFormSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function VerificationCodeForm() {
    const codeRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const router = useRouter();

    function onSubmit() {
        const parse = verifyCodeFormSchema.safeParse(codeRef.current?.value)
        if (parse.success) {
            const parsedCode = parse.data
            router.push(`/certificate-verification/${parsedCode}`);
        } else {
            setError('Verification Code ไม่ถูกต้อง')
        }
    }
    return (
        <div className="flex-col space-y-10 mx-auto py-9 w-2/5">
            <h2 className="text-base font-bold leading-7 text-gray-900">
                ตรวจสอบ Verification Code ของเกียรติบัตร
            </h2>
            <div className="space-y-4">
                <input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    ref={codeRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
                <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={onSubmit}
                >
                    ตรวจสอบ
                </button>
            </div>
            <p className="text-center text-red-500">{error}</p>
        </div>
    );
}
