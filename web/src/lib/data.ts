import "server-only";
import { db } from "./db";
import { DEMO_PROFESSIONAL_ID } from "./demo";

export type Patient = {
  id: string;
  full_name: string;
  email: string | null;
  goal: string;
  created_at: Date;
};

export type Checkin = {
  id: string;
  recorded_label: string;
  weight_kg: number | null;
  note: string;
  created_at: Date;
};

export type Plan = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
};

export async function getDashboard() {
  const result = await db().query<{ patients: number; checkins: number; plans: number }>(
    `SELECT
      (SELECT count(*)::int FROM patients WHERE professional_id = $1) AS patients,
      (SELECT count(*)::int FROM checkins c JOIN patients p ON p.id = c.patient_id WHERE p.professional_id = $1) AS checkins,
      (SELECT count(*)::int FROM plans pl JOIN patients p ON p.id = pl.patient_id WHERE p.professional_id = $1) AS plans`,
    [DEMO_PROFESSIONAL_ID],
  );
  return result.rows[0];
}

export async function getPatients() {
  const result = await db().query<Patient>(
    `SELECT id, full_name, email, goal, created_at
     FROM patients WHERE professional_id = $1 ORDER BY created_at DESC`,
    [DEMO_PROFESSIONAL_ID],
  );
  return result.rows;
}

export async function getPatient(id: string) {
  const result = await db().query<Patient>(
    `SELECT id, full_name, email, goal, created_at
     FROM patients WHERE id = $1 AND professional_id = $2`,
    [id, DEMO_PROFESSIONAL_ID],
  );
  return result.rows[0] ?? null;
}

export async function getPatientTimeline(id: string) {
  const [checkins, plans] = await Promise.all([
    db().query<Checkin>(
      `SELECT c.id, to_char(c.recorded_on, 'DD/MM/YYYY') AS recorded_label,
              c.weight_kg::float8 AS weight_kg, c.note, c.created_at
       FROM checkins c JOIN patients p ON p.id = c.patient_id
       WHERE c.patient_id = $1 AND p.professional_id = $2
       ORDER BY c.recorded_on DESC, c.created_at DESC`,
      [id, DEMO_PROFESSIONAL_ID],
    ),
    db().query<Plan>(
      `SELECT pl.id, pl.title, pl.content, pl.created_at
       FROM plans pl JOIN patients p ON p.id = pl.patient_id
       WHERE pl.patient_id = $1 AND p.professional_id = $2
       ORDER BY pl.created_at DESC`,
      [id, DEMO_PROFESSIONAL_ID],
    ),
  ]);
  return { checkins: checkins.rows, plans: plans.rows };
}
