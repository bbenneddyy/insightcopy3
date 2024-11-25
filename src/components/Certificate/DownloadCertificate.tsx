import React, { useState } from "react";
import { PDFDocument, rgb } from "@cantoo/pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { allowCertificateDownload } from "@/utils/config";

interface IDownloadCertificate {
  id: string
  name: string;
  lastname: string;
}

export default function DownloadCertificate({
  id,
  name,
  lastname,
}: IDownloadCertificate) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCertificate = async () => {
    if (!name || !lastname) {
      alert("Please provide both name and lastname.");
      return;
    }

    setIsDownloading(true);

    try {
      const pdfResponse = await fetch("/pdf/certificate-template.pdf");
      if (!pdfResponse.ok) {
        throw new Error("PDF fetch failed. Ensure the PDF path is correct.");
      }
      const certificateBytes = await pdfResponse.arrayBuffer();
      const pdfDoc = await PDFDocument.load(certificateBytes);

      pdfDoc.registerFontkit(fontkit);
      const thaiFontBytes = await fetch("/font/NotoSansThai-Regular.ttf").then(
        (res) => res.arrayBuffer()
      );
      const thaiFont = await pdfDoc.embedFont(thaiFontBytes, { subset: true });

      // Get the first page of the PDF template
      const [templatePage] = pdfDoc.getPages();
      const { width, height } = templatePage.getSize();

      const text = `${name} ${lastname}`;
      const textWidth = thaiFont.widthOfTextAtSize(text, 30); // the font size

      // Name
      templatePage.drawText(text, {
        x: (width - textWidth) / 2, // Center by subtracting half the text width from half the page width
        y: height / 2 - 40, // Adjust as needed
        size: 30,
        font: thaiFont,
        color: rgb(0, 0, 0),
      });

      // Verification code
      templatePage.drawText("Verification Code: " + id, {
        x: 10,
        y: height - 8,
        size: 12,
        font: thaiFont,
        color: rgb(0, 0, 0),
      });

      // Save the modified PDF document
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}_${lastname}_certificate.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(`Failed to generate PDF`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {allowCertificateDownload && (
        <div className="w-full flex justify-center">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-1/2"
            onClick={handleDownloadCertificate}
          >
            {isDownloading ?
            <span className="flex justify-center">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              </span>
              :
              "ดาวน์โหลดเกียรติบัตร"}
          </button>
        </div>
      )}
    </>
  );
}
