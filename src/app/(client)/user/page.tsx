'use client';

// import Certificate from "@/components/Certificate/Certificate";
import Video from "@/components/User/Video";
import { loginUser } from "@/utils/action";
import { useFormState, useFormStatus } from "react-dom";

const prevState = {
    message: "",
    status: 0,
    firstname: "",
    lastname: "",
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            aria-disabled={pending}
        >
            เข้าสู่ระบบ
        </button>
    );
}

export default function User() {
    const [state, formAction] = useFormState(loginUser, prevState);
    return (
        <>
            {state?.status === 200 ? (
                <>
                    {/* <Certificate firstname={state.firstname || ""} lastname={state.lastname || ""} /> */}
                    <Video />
                </>
            )
                : (
                    <form className="flex-col space-y-10 mx-auto py-9" action={formAction}>
                        <div className="flex flex-col items-center space-y-3 rounded-lg shadow-sm">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-bold leading-7 text-gray-900">กรุณาเข้าสู่ระบบ</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-full">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">หมายเลขโทรศัพท์</label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                autoComplete="phone"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">อีเมล</label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <SubmitButton />
                                </div>
                                <p className={`text-center ${state?.status === 200 ? 'text-green-600' : 'text-red-500'}`}>{state?.message}</p>
                            </div>
                        </div>
                    </form>
                )}
        </>
    );
}