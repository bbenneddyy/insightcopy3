import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from "next/font/google";
import { eventNumber } from "@/utils/config";

const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ ${eventNumber} | MDCU Insight`,
  description:
    "งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์ จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาฯ",
  icons: {
    icon: [
      { url: "/images/chulalogo.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/images/chulalogo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/chulalogo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/images/chulalogo.ico",
    apple: "/images/chulalogo.png",
  },
  openGraph: {
    title: `เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ ${eventNumber} | MDCU Insight`,
    description:
      "งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์ จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาฯ",
    url: "https://insight.docchula.com",
    siteName: "MDCU Insight",
    images: [
      {
        url: "/images/chulalogo.png",
        width: 1200,
        height: 630,
        alt: "MDCU Insight Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `เสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ ${eventNumber} | MDCU Insight`,
    description:
      "งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์ จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาฯ",
    images: ["/images/chulalogo.png"],
  },
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
