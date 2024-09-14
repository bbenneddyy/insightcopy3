"use client";

import { getQuestionsData } from "@/utils/data";

interface QuestionData {
    question: string | null;
    sessionNum: number;
    created_at: Date | null;
}

export default function GetCSVButton() {
  // Helper function for converting json to csv
  function jsonToCsv(jsonData: QuestionData[]): string {
    let csv = '';
    // Get the headers
    const headers: (keyof QuestionData)[] = ['question', 'sessionNum', 'created_at' ];
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach(function (row: QuestionData) {
      let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
      csv += data + '\n';
    });
    return csv;
  }
  async function handleClick() {
    const currentTime = new Date().toISOString();
    const QuestionData = await getQuestionsData()

    if (!QuestionData) {
      console.error("No Questions data available.");
      return;
    }
    
    const csvData = jsonToCsv(QuestionData);
    // Create a CSV file and allow the user to download it
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questions_${currentTime}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={() => handleClick()}
      >
        Download Questions
      </button>
    </>
  )
}
