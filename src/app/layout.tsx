import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from 'next/font/google'

const sarabun = Sarabun({
  weight: ['400', '700'],
  subsets: ['thai'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34",
  description: "งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์ จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาฯ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.className}>
      <body>{children}</body>
    </html>
  );
}