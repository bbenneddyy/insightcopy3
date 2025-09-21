"use client";

// import { LinkIcon } from "@heroicons/react/20/solid";
import DownloadCertificate from "@/components/Certificate/DownloadCertificate";

interface IMainContent {
  site: string;
  id: string;
  firstName: string;
  lastName: string;
}

export default function MainContent({
  site,
  id,
  firstName,
  lastName,
}: IMainContent) {
  const videos = [
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=f70f9da0-cc8e-4f5a-89f0-7dffb1eee016&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "พิธีเปิด",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=03059446-d1da-4b0b-87bb-02d2fc5bf8a8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "แพทย์...ทางเลือกที่ใช่?",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=fcff8cbf-fe90-4e24-b33f-1b39da0262be&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "ตีแผ่ชีวิต Pre-clerkship",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=93add6d6-8195-4eec-9034-39167752e391&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "ตีแผ่ชีวิต Clinical clerkship",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=3a9fcd1b-6587-4527-b049-b58ab0d8c04a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "ความสุขกับชีวิตการเป็นแพทย์",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=15924c2c-d0b0-4273-9991-60c0dce489a4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "หลักสูตรการเรียนแพทย์ (S/U grading หลักสูตรใหม่แพทย์จุฬาฯ)",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=b7f9ff22-1735-4c56-8daf-e979c8a6786b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "การเตรียมตัวสอบเข้าคณะแพทย์",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=ef52ea91-b356-447b-957d-657b32ef805a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "จัดการความเครียดกับการอ่านหนังสือ",
    },
    {
      src: "https://chula-my.sharepoint.com/personal/6331119030_student_chula_ac_th/_layouts/15/embed.aspx?UniqueId=88465db4-4fd3-4178-9b8f-ad38993f5004&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
      title: "พิธีปิด",
    },
  ];
  return (
    <>
      <div className="flex justify-center items-start min-h-screen pt-16">
        <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            {site === "online" && (
              <>
                {/* <h1 className="text-lg font-semibold text-blue-500">
                  <a
                    href="https://chula.zoom.us/j/98602876220?pwd=H2XMmg1qnT2x00UayarfKkUdz1mpqT.1"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    กดเพื่อเข้าร่วมงานเสวนา
                    <LinkIcon className="h-5 w-5 inline" />
                  </a>
                </h1>
                <p>Meeting ID: 986 0287 6220</p>
                <p>Password: 626147</p> */}
              </>
            )}
            {/* <h3 className="text-gray-500">
              วีดีโอย้อนหลังและเกียรติบัตรการเข้าร่วม
              จะสามารถใช้ได้หลังสิ้นสุดงานเสวนา
            </h3> */}
          </div>
          <h3 className="text-center font-bold my-4">ติดตาม url สำหรับเข้าร่วมงาน online ได้ในหน้านี้</h3>

          <DownloadCertificate id={id} name={firstName} lastname={lastName} />
          <h3 className="text-center font-bold my-4">วีดีโอย้อนหลัง</h3>
          {videos.map((video) => (
            <div key={video.title} className="flex justify-center my-4">
              <iframe
                src={video.src}
                width="640"
                height="360"
                title={video.title}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
