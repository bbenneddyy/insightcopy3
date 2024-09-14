
import Image from "next/image";
import html2canvas from "html2canvas";
import { useRef } from "react";
import jsPDF from "jspdf";

interface ICertificateProps {
    firstname: string
    lastname: string
}

// html2canvas should be reimplemented later.
export default function Certificate({ firstname, lastname }: ICertificateProps) {
  const certificateRef = useRef(null);
  const handleDownloadpdf = () => {
    if (certificateRef.current) {
      // Check if current is not null
      html2canvas(certificateRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", [4000, 2821]);
        pdf.addImage(imgData, "PNG", 0, 0, 4000, 2821);
        pdf.save(`${name}_${lastname}_certificate.pdf`);
      });
    } else {
      alert("ไม่สามารถดาวน์โหลดเกียรติบัตรได้"); // Handle null case
    }
  };

  return (
    <>
      <div
        ref={certificateRef}
        className="relative bg-gray-800 h-screen flex items-center justify-center text-white overflow-auto"
      >
        <Image
          src="/images/Certificatetemplate01.png"
          alt="placeholder"
          layout="fill"
          objectFit="contain" // Change to contain to maintain aspect ratio
          className="absolute inset-0 z-0"
        />
        <p className="relative z-10 text-stone-900 text-5xl font-bold italic my-4 ">
          {firstname} {lastname}
        </p>
      </div>
      <button
        onClick={handleDownloadpdf}
        className="border-2 border-black w-full outline-none bg-gray-300 py-4 px-6 text-lg  transition-all duration-300 ease cursor-pointer hover:bg-black hover:text-white"
      >
        Download Certificate
      </button>
    </>
  );
};

