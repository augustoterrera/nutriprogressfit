"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { assertLocalDemo, DEMO_PROFESSIONAL_ID } from "@/lib/demo";

const patientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(160),
  goal: z.string().trim().min(3).max(500),
});

const uuid = z.uuid();

function validCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export async function createPatient(formData: FormData) {
  assertLocalDemo();
  const parsed = patientSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    goal: formData.get("goal"),
  });
  if (!parsed.success || (parsed.data.email && !z.email().safeParse(parsed.data.email).success)) {
    redirect("/pacientes?error=datos");
  }

  const result = await db().query<{ id: string }>(
    `INSERT INTO patients (professional_id, full_name, email, goal)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [DEMO_PROFESSIONAL_ID, parsed.data.name, parsed.data.email || null, parsed.data.goal],
  );
  revalidatePath("/");
  revalidatePath("/pacientes");
  redirect(`/pacientes/${result.rows[0].id}`);
}

export async function addCheckin(formData: FormData) {
  assertLocalDemo();
  const patientId = formData.get("patientId");
  const date = formData.get("date");
  const weight = String(formData.get("weight") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const id = uuid.safeParse(patientId);
  if (!id.success) redirect("/pacientes");
  const dateValid = validCalendarDate(date);
  const weightNumber = weight ? Number(weight) : null;
  if (!dateValid || note.length > 2000 || (weightNumber !== null && (!Number.isFinite(weightNumber) || weightNumber <= 0 || weightNumber > 500)) || (!note && weightNumber === null)) {
    redirect(`/pacientes/${id.data}?error=control`);
  }

  await db().query(
    `INSERT INTO checkins (patient_id, recorded_on, weight_kg, note)
     SELECT id, $3, $4, $5 FROM patients WHERE id = $1 AND professional_id = $2`,
    [id.data, DEMO_PROFESSIONAL_ID, date, weightNumber, note],
  );
  revalidatePath(`/pacientes/${id.data}`);
  redirect(`/pacientes/${id.data}`);
}

export async function createPlan(formData: FormData) {
  assertLocalDemo();
  const id = uuid.safeParse(formData.get("patientId"));
  if (!id.success) redirect("/pacientes");
  const parsed = z.object({
    title: z.string().trim().min(3).max(120),
    content: z.string().trim().min(10).max(10000),
  }).safeParse({ title: formData.get("title"), content: formData.get("content") });
  if (!parsed.success) redirect(`/pacientes/${id.data}?error=plan`);

  await db().query(
    `INSERT INTO plans (patient_id, title, content)
     SELECT id, $3, $4 FROM patients WHERE id = $1 AND professional_id = $2`,
    [id.data, DEMO_PROFESSIONAL_ID, parsed.data.title, parsed.data.content],
  );
  revalidatePath(`/pacientes/${id.data}`);
  redirect(`/pacientes/${id.data}`);
}
