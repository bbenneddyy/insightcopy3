"use server";

import { db } from "@/utils/db";
import {
  editFormSchema,
  loginFormSchema,
  sendMailSchema,
  submitFormSchema,
} from "./schema";
import { writeFile } from "fs/promises";
import path from "path";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { maximumOnsiteParticipants, webStatus } from "./config";
import { sendMail } from "./sendMail";
import { getCurrentNumberOnsiteParticipants } from "./data";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";

// Create Participant
// prevState is required. Please do not delete
export async function createParticipant(
  prevState: { message: string; status: number },
  formData: FormData
) {
  noStore();
  // Close registration
  if (webStatus !== "open") {
    return { message: "ปิดรับสมัครแล้ว", status: 400 };
  }

  // Parse data
  const parse = submitFormSchema.safeParse({
    education: formData.get("education"),
    title: formData.get("title"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    allergy: formData.get("allergy"),
    site: formData.get("site"),
    reason: formData.get("reason") || "",
    slip: formData.get("slip") as File,
    sessionOne: formData.get("sessionOne"),
    sessionTwo: formData.get("sessionTwo"),
    sessionThree: formData.get("sessionThree"),
    sessionFour: formData.get("sessionFour"),
    sessionFive: formData.get("sessionFive"),
    sessionSix: formData.get("sessionSix"),
    sessionSeven: formData.get("sessionSeven"),
  });

  if (!parse.success) {
    return {
      message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      status: 500,
    };
  }

  const data = parse.data;
  const fileType = data.slip?.type.split("/")[1];

  // Number of onsite participants should not exceed maximumOnsiteParticipants
  if (data.site === "onsite") {
    const currentNumberOnsiteParticipants =
      await getCurrentNumberOnsiteParticipants();
    if (
      typeof currentNumberOnsiteParticipants === "number" &&
      currentNumberOnsiteParticipants >= maximumOnsiteParticipants
    ) {
      return { message: "จำนวนผู้สมัคร Onsite ครบจำนวนแล้ว", status: 400 };
    }
  }

  try {
    const newRegistration = await db.registration.create({
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        allergy: data.allergy,
        site: data.site,
        reason: data.reason,
        file_type: fileType,
        questions: {
          create: [
            { sessionNum: 1, question: data.sessionOne || "" },
            { sessionNum: 2, question: data.sessionTwo || "" },
            { sessionNum: 3, question: data.sessionThree || "" },
            { sessionNum: 4, question: data.sessionFour || "" },
            { sessionNum: 5, question: data.sessionFive || "" },
            { sessionNum: 6, question: data.sessionSix || "" },
            { sessionNum: 7, question: data.sessionSeven || "" },
          ],
        },
      },
    });

    const content = `${newRegistration.id}.${fileType}`;

    const buffer = Buffer.from(await data.slip?.arrayBuffer());
    await writeFile(path.join(process.cwd(), `assets/${content}`), buffer);

    // Send confirmation email after registration
    sendMail({
      to: data.email,
      subject: "ยืนยันการส่งข้อมูลเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34",
      firstname: data.firstname,
      lastname: data.lastname,
      text: "ทางนิสิตผู้จัดงานขอขอบคุณที่ท่านได้สมัครเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34 ประจำปีการศึกษา 2567 และ ขอให้ท่านกรุณารอรับอีเมลยืนยันการตรวจสอบหลักฐานการชำระเงินอีกครั้งหนึ่ง",
    });

    return {
      message: `${data.firstname} ${data.lastname} (${data.email})`,
      status: 200,
    };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { message: "ไม่สามารถใช้ข้อมูลซ้ำได้", status: 400 };
    }
    return {
      message: "สมัครไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      status: 400,
    };
  }
}

// Update registration status
export async function updateRegistrationStatus(id: string, status: string) {
  const session = await getServerSession();
  if (!session) return null;
  try {
    await db.registration.update({
      where: { id },
      data: { status },
    });

    // Send email to alert participant that the application is accepted.
    const data = await db.registration.findUnique({
      where: { id },
    });
    const parse = sendMailSchema.safeParse(data);

    if (!parse.success) {
      return {
        message: "Fail to get user data",
        status: 500,
      };
    }

    const user = parse.data;

    const mailOptions = {
      to: user.email,
      subject: "ยืนยันการสมัครเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34",
      firstname: user.firstname,
      lastname: user.lastname,
      text: "",
    };

    if (status === "accepted") {
      if (user.site === "online") {
        mailOptions.text = `ทางผู้จัดงานขอยืนยันการเข้าร่วมงานเสวนาของท่าน โดยขอแจ้งรายละเอียดงาน ดังนี้
          “งานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34 งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์
          จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย” ในวันที่ 2
          พฤศจิกายน 2567 ในรูปแบบ Online ผ่านระบบ MS team Townhall โดยสำหรับ
          URL สำหรับเข้าร่วมจะส่งให้ภายใน 7 วันก่อนเริ่มงาน หรือสามารถเข้าร่วมงานผ่านระบบ login ทาง converse.docchula.com`;
      } else if (user.site === "onsite") {
        mailOptions.text = `ทางผู้จัดงานขอยืนยันการเข้าร่วมงานเสวนาของท่านโดยขอแจ้งรายละเอียดงาน ดังนี้
          “งานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34 งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์
          จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย” ในวันที่ 2
          พฤศจิกายน 2567 ในรูปแบบ Onsite ณ เวลา 09.00 น. ถึง 15.25 น.
          ห้องเฉลิมพรมมาส อาคารอปร. คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย`;
      } else {
        return { message: "เกิดข้อผิดพลาดในการส่งอีเมล", status: 200 };
      }
      sendMail(mailOptions);
    } else if ((status = "rejected")) {
      mailOptions.subject = `พบปัญหาในการสมัครค่ายเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34`;
      mailOptions.text = `ขออภัยในความไม่สะดวก ทางผู้จัดงานพบปัญหาในการตรวจสอบหลักฐานการสมัครของท่าน\nกรุณาติดต่อผู้จัดงานผ่านทาง Facebook Page:
      ค่ายอยากเป็นหมอ สโมสรนิสิตคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย\nแจ้งชื่อ นามสกุล อีเมล เบอร์โทรศัพท์ ของท่านที่ใช้สมัคร`;

      sendMail(mailOptions);
    }

    return { message: `User is ${status}`, status: 200 };
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Update user's information
// prevState is required. Please do not delete
export async function updateUserInformation(
  prevState: { message: string; status: number },
  formData: FormData
) {
  const session = await getServerSession();
  if (!session) return { message: "Unauthorized", status: 401 };
  // Parse data
  const parse = editFormSchema.safeParse({
    id: formData.get("userId"),
    education: formData.get("education"),
    title: formData.get("title"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    allergy: formData.get("allergy"),
    site: formData.get("site"),
  });
  if (!parse.success) {
    return { message: "แก้ไขไม่สำเร็จ", status: 500 };
  }
  const data = parse.data;
  try {
    const edituser = await db.registration.update({
      where: { id: data.id },
      data: {
        education: data.education,
        title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        allergy: data.allergy,
        site: data.site,
      },
    });
    if (edituser) {
      console.log("User edited successfully");
    } else {
      console.log("Failed to edit user");
    }
    return { message: `${data.email} แก้ไขสำเร็จ`, status: 200 };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { message: "ไม่สามารถใช้ข้อมูลซ้ำได้", status: 400 };
    }
    return { message: "แก้ไขไม่สำเร็จ กรุณาตรวจสอบข้อมูล", status: 400 };
  }
}

export async function loginUser(
  prevState: { message: string; status: number },
  formData: FormData
) {
  const parse = loginFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parse.success) {
    return {
      message: "หมายเลขโทรศัพท์หรืออีเมลไม่ถูกต้อง",
      status: 403,
    };
  }

  const data = parse.data;

  const user = await db.registration.findUnique({
    where: { email: data.email },
  });
  if (!user)
    return {
      message: "หมายเลขโทรศัพท์หรืออีเมลไม่ถูกต้อง",
      status: 403,
    };

  if (user.phone === formData.get("phone")) {
    return {
      message: "เข้าสู่ระบบสำเร็จ",
      status: 200,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      authStatus: user.status,
      site: user.site,
    };
  } else {
    return {
      message: "หมายเลขโทรศัพท์หรืออีเมลไม่ถูกต้อง",
      status: 403,
    };
  }
}
