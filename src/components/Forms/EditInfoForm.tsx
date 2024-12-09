'use client';

import { useActionState } from "react";
import { updateUserInformation } from "@/utils/action";
import { useFormStatus } from "react-dom";

interface IEditInfo {
    id: string
    registeredUser: any
}

const prevState = {
    message: "",
    status: 0,
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            aria-disabled={pending}
        >
            แก้ไข
        </button>
    );
}

export default function EditInfoForm({ id, registeredUser }: IEditInfo) {
    const [state, formAction] = useActionState(updateUserInformation, prevState);
    return (
        <form className="flex-col space-y-10 mx-auto py-9" action={formAction}>
            {/* Pass id to server action */}
            <input type="hidden" name="userId" value={id} />
            <div className="flex flex-col items-center space-y-3 rounded-lg shadow-sm">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-bold leading-7 text-gray-900">ลงทะเบียน</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">ระดับชั้นการศึกษา</label>
                            <div className="mt-2">
                                <select
                                    id="education"
                                    name="education"
                                    autoComplete="education-level"
                                    defaultValue={registeredUser.education}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>มัธยมศึกษาตอนต้น</option>
                                    <option>มัธยมศึกษาปีที่ 4</option>
                                    <option>มัธยมศึกษาปีที่ 5</option>
                                    <option>มัธยมศึกษาปีที่ 6</option>
                                    <option>ผู้ปกครอง</option>
                                    <option>อื่น ๆ</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">คำนำหน้าชื่อตามบัตรประชาชน</label>
                            <div className="mt-2">
                                <select
                                    id="title"
                                    name="title"
                                    autoComplete="title-name"
                                    defaultValue={registeredUser.title}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>นาย</option>
                                    <option>นาง</option>
                                    <option>นางสาว</option>
                                    <option>ด.ช.</option>
                                    <option>ด.ญ.</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">ชื่อ (ภาษาไทย)</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    autoComplete="first-name"
                                    defaultValue={registeredUser.firstname}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">นามสกุล (ภาษาไทย)</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    autoComplete="last-name"
                                    defaultValue={registeredUser.lastname}
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
                                    type="email"
                                    autoComplete="email"
                                    defaultValue={registeredUser.email}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">หมายเลขโทรศัพท์</label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    autoComplete="phone"
                                    defaultValue={registeredUser.phone}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                            <label
                                htmlFor="allergy"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                สิ่งที่แพ้ (อาหาร ยา และ อื่น ๆ)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="allergy"
                                    name="allergy"
                                    type="text"
                                    autoComplete="allergy"
                                    defaultValue={registeredUser.allergy}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                            <label
                                htmlFor="site"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                ประเภทการสมัคร
                            </label>
                            <div className="mt-2">
                                <select
                                    id="site"
                                    name="site"
                                    autoComplete="site-type"
                                    defaultValue={registeredUser.site}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="onsite">Onsite ค่าสมัคร 350 บาท</option>
                                    <option value="online">Online ค่าสมัคร 200 บาท</option>
                                </select>
                            </div>
                        </div>
                        <SubmitButton />
                    </div>
                    <p className={`text-center ${state?.status === 200 ? 'text-green-600' : 'text-red-500'}`}>{state?.message}</p>
                </div>
            </div>
        </form>
    );
}