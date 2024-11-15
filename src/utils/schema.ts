import { z } from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const submitFormSchema = z.object({
  education: z.string().min(1),
  title: z.string().min(1),
  firstname: z.string().trim().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  lastname: z.string().trim().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  email: z.string().trim().email({
    message: "กรุณากรอกอีเมลที่ถูกต้อง",
  }),
  phone: z.string().regex(/^\d{9,10}$/, {
    message: "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง",
  }),
  allergy: z.string().optional().or(z.literal("")),
  site: z.string().min(1),
  reason: z.string().optional().or(z.literal("")),
  slip: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "กรุณาเลือกรุปภาพที่ถูกต้อง")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 1MB.`),
  sessionOne: z.string().optional().or(z.literal("")),
  sessionTwo: z.string().optional().or(z.literal("")),
  sessionThree: z.string().optional().or(z.literal("")),
  sessionFour: z.string().optional().or(z.literal("")),
  sessionFive: z.string().optional().or(z.literal("")),
  sessionSix: z.string().optional().or(z.literal("")),
  sessionSeven: z.string().optional().or(z.literal("")),
});

export const editFormSchema = z.object({
  id: z.string().min(1),
  education: z.string().min(1),
  title: z.string().min(1),
  firstname: z.string().trim().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  lastname: z.string().trim().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  email: z.string().trim().email({
    message: "กรุณากรอกอีเมลที่ถูกต้อง",
  }),
  phone: z.string().regex(/^\d{9,10}$/, {
    message: "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง",
  }),
  allergy: z.string().optional().or(z.literal("")),
  site: z.string().min(1),
});

export const sendMailSchema = z.object({
  email: z.string().trim().email({
    message: "กรุณากรอกอีเมลที่ถูกต้อง",
  }),
  firstname: z.string().trim().min(1, {
    message: "กรุณากรอกชื่อ",
  }),
  lastname: z.string().trim().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  site: z.string().min(1),
})

export const loginFormSchema = z.object({
  email: z.string().trim().email({
    message: "กรุณากรอกอีเมลที่ถูกต้อง",
  }),
});

export const verifyCodeFormSchema = z.string().trim().toLowerCase().cuid();