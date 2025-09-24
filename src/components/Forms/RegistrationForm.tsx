"use client";

import { createParticipant } from "@/utils/action";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { FormEvent, useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentNumberOnsiteParticipants } from "@/utils/data";
import { maximumOnsiteParticipants } from "@/utils/config";

const initialState = {
  message: "",
  status: 0,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      aria-disabled={pending}
    >
      สมัคร
    </button>
  );
}

export default function RegistrationForm() {
  const [state, formAction] = useActionState(createParticipant, initialState);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [limit, setLimit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !state.message) return;
    const scrollToError = () => {
      const errorStateText = document.getElementById("state");
      if (!errorStateText) return;
      errorStateText.scrollIntoView({ behavior: "smooth" });
    };
    window.requestAnimationFrame(scrollToError);
  }, [state.message]);

  useEffect(() => {
    async function checkOnsiteLimit() {
      try {
        const onsiteNumber = await getCurrentNumberOnsiteParticipants();
        if (onsiteNumber && onsiteNumber >= maximumOnsiteParticipants) {
          setLimit(true);
        }
        return;
      } catch (error) {
        console.error(error);
      }
    }

    checkOnsiteLimit();
  }, []);

  function onSelectImage(e: any) {
    console.log(e);
    setSelectedImage(e.target.files[0]);
  }

  useEffect(() => {
    console.log(selectedImage);
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const currentTime = new Date().toISOString();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (
      !confirm(
        "กรุณาตรวจสอบความถูกต้องของข้อมูลเนื่องจากหลังส่งข้อมูลแล้ว จะไม่สามารถเปลี่ยนแปลงข้อมูลได้"
      )
    ) {
      e.preventDefault();
    }
  };
  return (
    <>
      {state?.status === 200 ? (
        <div className="flex flex-col items-center mt-24">
          <div className="text-center mb-4 bg-white p-8 w-3/4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              สมัครสำเร็จ
            </h1>
            <h2 className="text-lg text-gray-700 mb-2">{state?.message}</h2>
            <hr />
            <h2 className="text-md mt-4 text-gray-700 mb-2">
              โปรดบันทึกหน้านี้ไว้เป็นหลักฐาน
            </h2>
            <h2 className="text-md text-gray-700 mb-4">{currentTime}</h2>
            <button
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
              hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-green-600"
              onClick={() => router.push("/")}
            >
              สมัครเพิ่ม
            </button>
          </div>
        </div>
      ) : (
        <form
          className="flex-col space-y-10 mx-auto px-4 py-9"
          onSubmit={onSubmit}
          action={formAction}
        >
          <div className="flex flex-col items-center space-y-3 rounded-lg shadow-xs">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                ลงทะเบียน
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ระดับชั้นการศึกษา
                  </label>
                  <div className="mt-2">
                    <select
                      id="education"
                      name="education"
                      autoComplete="education-level"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    คำนำหน้าชื่อตามบัตรประชาชน
                  </label>
                  <div className="mt-2">
                    <select
                      id="title"
                      name="title"
                      autoComplete="title-name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ชื่อ (ภาษาไทย)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="first-name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    นามสกุล (ภาษาไทย)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="last-name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                  <p className="block text-sm font-medium leading-6 text-gray-500">
                    ห้ามใช้อีเมลซ้ำระหว่างผู้เข้าร่วมงาน
                  </p>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@email.com"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    หมายเลขโทรศัพท์
                  </label>
                  <p className="block text-sm font-medium leading-6 text-gray-500">
                    ตัวเลขเท่านั้น
                  </p>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="phone"
                      placeholder="0999999999"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                  <p className="block text-sm font-medium leading-6 text-gray-500">
                    เฉพาะผู้สมัคร onsite เท่านั้น
                  </p>
                  <div className="mt-2">
                    <input
                      id="allergy"
                      name="allergy"
                      type="text"
                      autoComplete="allergy"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                  {limit && (
                    <p className="text-red-400">ผู้สมัคร onsite ครบจำนวนแล้ว</p>
                  )}
                  <div className="mt-2">
                    <select
                      id="site"
                      name="site"
                      autoComplete="site-type"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {!limit && (
                        <option value="onsite">Onsite ค่าสมัคร 350 บาท</option>
                      )}
                      <option value="online">Online ค่าสมัคร 200 บาท</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    เหตุผลที่อยากเข้าร่วม (ถ้ามี)
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <div className="space-y-2">
                    <p className="text-sm font-bold">
                      รายละเอียดการชำระค่าสมัคร
                    </p>
                    <ul className="text-sm space-y-2 bg-gray-100 p-3 rounded-lg">
                      <li>ธนาคารกสิกรไทย สาขาโรงพยาบาลจุฬาลงกรณ์</li>
                      <li>เลขบัญชี 211-2-94222-2</li>
                      <li>
                        (โครงการค่ายอยากเป็นหมอ ครั้งที่ 35 โดย นาย วศิน วง)
                      </li>
                    </ul>

                    <div className="mt-4 flex flex-col items-center">
                      <Image
                        src="/images/S__313466884.jpg"
                        alt="สแกน QR เพื่อโอนเข้าบัญชี"
                        width={360}
                        height={360}
                        className="rounded-lg shadow-sm"
                      />
                      <p className="text-xs text-gray-600 mt-2">
                        สแกน QR เพื่อโอนเข้าบัญชี
                      </p>
                    </div>
                  </div>
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {!preview && (
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="slip"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-hidden focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                        >
                          {preview && (
                            <Image
                              src={preview}
                              alt="Payment slip preview"
                              width={400}
                              height={400}
                              className="mx-auto"
                            />
                          )}
                          <span>โปรดแนบหลักฐานการชำระเงิน</span>
                          <input
                            id="slip"
                            name="slip"
                            type="file"
                            accept="image/*"
                            onChange={onSelectImage}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG หรือ JPG ไม่เกิน 1MB
                      </p>
                    </div>
                  </div>
                </div>
                {/* Questions zone */}
                <span className="sm:col-span-full font-bold">
                  ส่งคำถามในแต่ละ session (ถ้ามี)
                </span>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionOne"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    แพทย์...ทางเลือกที่ใช่?
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionOne"
                      name="sessionOne"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionTwo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ตีแผ่ชีวิต Preclinical clerkship
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionTwo"
                      name="sessionTwo"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionThree"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ตีแผ่ชีวิต Clinical clerkship
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionThree"
                      name="sessionThree"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionFour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ความสุขกับชีวิตการเป็นแพทย์
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionFour"
                      name="sessionFour"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionFive"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    หลักสูตรการเรียนแพทย์ (S/U grading หลักสูตรใหม่แพทย์จุฬาฯ)
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionFive"
                      name="sessionFive"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionSix"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    การเตรียมตัวสอบเข้าคณะแพทย์
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionSix"
                      name="sessionSix"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sessionSeven"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    จัดการความเครียดกับการอ่านหนังสือ
                  </label>
                  <div className="mt-2">
                    <input
                      id="sessionSeven"
                      name="sessionSeven"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <SubmitButton />
              </div>
              <p id="state" className="text-center text-red-500">
                {state?.message}
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
