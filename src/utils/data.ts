"use server";

import { db } from "./db";
import { eventNumber } from "./config";

// Get all participants' data
export async function getParticipantData() {
  try {
    const participantData = await db.registration.findMany({
      where: {
        status: "accepted",
        archive: false,
        event_number: eventNumber,
      },
      select: {
        title: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        education: true,
        reason: true,
        questions: true,
        site: true,
        allergy: true,
      },
    });
    return participantData;
  } catch (e) {
    console.error(e);
  }
}

export async function getCurrentNumberOnsiteParticipants() {
  try {
    const numberOnsite = await db.registration.count({
      where: {
        site: "onsite",
        archive: false,
        event_number: eventNumber,
      },
    });
    return numberOnsite;
  } catch (e) {
    console.error(e);
  }
}

export async function getQuestionsData() {
  try {
    const questions = await db.question.findMany({
      where: {
        NOT: {
          question: "",
        },
        participant: {
          archive: false,
          event_number: eventNumber,
        },
      },
      select: {
        sessionNum: true,
        question: true,
        created_at: true,
      },
    });
    return questions;
  } catch (e) {
    console.error(e);
  }
}
