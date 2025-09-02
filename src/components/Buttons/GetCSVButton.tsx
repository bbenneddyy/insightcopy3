"use client";

import { getParticipantData } from "@/utils/data";

interface ParticipantData {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  site: string;
  allergy: string | null;
  reason: string | null;
  phone: string;
  education: string;
}

export default function GetCSVButton() {
  // Helper function for converting json to csv
  function jsonToCsv(jsonData: ParticipantData[]): string {
    if (!jsonData || jsonData.length === 0) {
      console.error("No data available to convert.");
      return "";
    }
    const headers = Object.keys(jsonData[0]) as (keyof ParticipantData)[];
    const rows: string[] = [headers.join(',')];

    for (const row of jsonData) {
      const values = headers.map(header => {
        const value = row[header]?.toString() ?? '';
        return `"${value.replace(/"/g, '""')}"`;
      });
      rows.push(values.join(','));
    }

    return rows.join('\n');
  }
  async function handleClick() {
    const currentTime = new Date().toISOString();
    const participantData = await getParticipantData()

    if (!participantData) {
      console.error("No participant data available.");
      return;
    }

    const csvData = jsonToCsv(participantData);
    // Create a CSV file and allow the user to download it
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insight_participant_data_${currentTime}.csv`;
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
        Download CSV
      </button>
    </>
  )
}
