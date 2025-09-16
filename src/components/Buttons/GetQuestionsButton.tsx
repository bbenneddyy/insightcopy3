"use client";

import { getQuestionsData } from "@/utils/data";

interface QuestionData {
  question: string | null;
  sessionNum: number;
  created_at: Date | null;
}

export default function GetQuestionsButton() {
  // Helper function for converting json to csv
  function jsonToCsv(jsonData: QuestionData[]): string {
    if (!jsonData || jsonData.length === 0) {
      console.error("No data available to convert.");
      return "";
    }
    const headers = Object.keys(jsonData[0]) as (keyof QuestionData)[];
    const rows: string[] = [headers.join(",")];

    for (const row of jsonData) {
      const values = headers.map((header) => {
        const value = row[header]?.toString() ?? "";
        return `"${value.replace(/"/g, '""')}"`;
      });
      rows.push(values.join(","));
    }

    // Use CRLF for better compatibility with Excel on Windows
    return rows.join("\r\n");
  }
  async function handleClick() {
    const currentTime = new Date().toISOString();
    const QuestionData = await getQuestionsData();

    if (!QuestionData) {
      console.error("No Questions data available.");
      return;
    }

    const csvData = jsonToCsv(QuestionData);
    // Create a CSV file and allow the user to download it
    // Prepend UTF-8 BOM so Excel properly recognizes UTF-8 (Thai characters)
    const bom = "\ufeff";
    const blob = new Blob([bom + csvData], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `questions_${currentTime}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600"
        onClick={() => handleClick()}
      >
        Download Questions
      </button>
    </>
  );
}
