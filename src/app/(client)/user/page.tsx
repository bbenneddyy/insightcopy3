"use client";

// import Certificate from "@/components/Certificate/Certificate";
import MainContent from "@/components/User/MainContent";
import { loginUser } from "@/utils/action";
import { useFormState, useFormStatus } from "react-dom";

const prevState = {
  message: "",
  status: 0,
  firstname: "",
  lastname: "",
  authStatus: "",
  site: "",
};

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
      {state?.status === 200 && state?.authStatus === "accepted" ? (
        <>
          {/* <Certificate firstname={state.firstname || ""} lastname={state.lastname || ""} /> */}
          <MainContent site={state.site} />
        </>
      ) : state?.status === 200 && state?.authStatus === "rejected" ? (
        <>
          <div className="flex justify-center items-start min-h-screen pt-16">
            <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <h1 className="text-lg font-semibold text-gray-800">
                  พบปัญหากับการลงทะเบียน กรุณาติดต่อทีมงานเสวนาค่ายอยากเป็นหมอ
                </h1>
                <div className="relative inline-block rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 mt-4">
                  <a
                    href="https://www.facebook.com/MDCUmedcamp"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-semibold text-green-600 hover:text-green-700"
                  >
                    ติดต่อทีมงาน <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : state?.status === 200 && state?.authStatus === "pending" ? (
        <>
          <div className="flex justify-center items-start min-h-screen pt-16">
            <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <h1 className="text-lg font-semibold text-gray-800">
                  กำลังตรวจสอบเอกสารการโอนเงิน
                </h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <form className="flex-col space-y-10 mx-auto py-9" action={formAction}>
          <div className="flex flex-col items-center space-y-3 rounded-lg shadow-sm">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                กรุณาเข้าสู่ระบบ
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    หมายเลขโทรศัพท์
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="phone"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    อีเมล
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <SubmitButton />
              </div>
              <p
                className={`text-center ${
                  state?.status === 200 ? "text-green-600" : "text-red-500"
                }`}
              >
                {state?.message}
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
