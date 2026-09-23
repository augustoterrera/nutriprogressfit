import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { addCheckin, createPlan } from "@/app/actions";
import { getPatient, getPatientTimeline } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PatientDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!z.uuid().safeParse(id).success) notFound();
  const patient = await getPatient(id);
  if (!patient) notFound();
  const { checkins, plans } = await getPatientTimeline(id);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());

  return (
    <>
      <Link className="back-link" href="/pacientes">← Volver a pacientes</Link>
      <div className="page-heading">
        <div><span className="eyebrow green">Ficha de seguimiento</span><h1>{patient.full_name}</h1><p>Objetivo: {patient.goal}</p></div>
      </div>
      {query.error && <div className="alert" role="alert">Revisá los datos del formulario e intentá nuevamente.</div>}
      <section className="card">
        <div className="section-heading"><div><h2>Resumen</h2><p>Información inicial del paciente</p></div></div>
        <div className="detail-grid">
          <div className="detail-item"><small>Email</small><strong>{patient.email || "Sin email"}</strong></div>
          <div className="detail-item"><small>Actividad registrada</small><strong>{checkins.length} controles · {plans.length} planes</strong></div>
        </div>
      </section>
      <div className="columns">
        <div className="stack">
          <section className="card">
            <div className="section-heading"><div><h2>Plan alimentario</h2><p>Guardá una versión de trabajo para probar el flujo.</p></div></div>
            <form action={createPlan} className="form">
              <input type="hidden" name="patientId" value={id} />
              <label>Título<input name="title" required minLength={3} maxLength={120} placeholder="Ej.: Plan inicial · semana 1" /></label>
              <label>Indicaciones<textarea name="content" required minLength={10} maxLength={10000} placeholder="Comidas, porciones, horarios y observaciones..." /></label>
              <button className="button" type="submit">Guardar plan</button>
            </form>
          </section>
          <section className="card">
            <div className="section-heading"><div><h2>Planes guardados</h2><p>Historial de versiones creadas</p></div></div>
            {plans.length ? plans.map((plan) => (
              <article className="timeline-item" key={plan.id}>
                <h3>{plan.title}<span className="pill">Borrador local</span></h3>
                <small>{plan.created_at.toLocaleDateString("es-AR")}</small>
                <p>{plan.content}</p>
              </article>
            )) : <p className="empty">Todavía no hay planes para este paciente.</p>}
          </section>
        </div>
        <div className="stack">
          <section className="card">
            <div className="section-heading"><div><h2>Nuevo control</h2><p>Registrá una nota de seguimiento.</p></div></div>
            <form action={addCheckin} className="form">
              <input type="hidden" name="patientId" value={id} />
              <label>Fecha<input type="date" name="date" defaultValue={today} required /></label>
              <label>Peso en kg (opcional)<input type="number" name="weight" min="0.1" max="500" step="0.1" placeholder="Ej.: 68.4" /></label>
              <label>Observaciones<textarea name="note" maxLength={2000} placeholder="Adherencia, dificultades, acuerdos para la próxima semana..." /></label>
              <button className="button" type="submit">Guardar control</button>
            </form>
          </section>
          <section className="card">
            <div className="section-heading"><div><h2>Evolución</h2><p>Controles más recientes primero</p></div></div>
            {checkins.length ? checkins.map((checkin) => (
              <article className="timeline-item" key={checkin.id}>
                <h3>{checkin.recorded_label}{checkin.weight_kg !== null && <span className="pill">{checkin.weight_kg} kg</span>}</h3>
                {checkin.note && <p>{checkin.note}</p>}
              </article>
            )) : <p className="empty">Todavía no hay controles para este paciente.</p>}
          </section>
        </div>
      </div>
    </>
  );
}
