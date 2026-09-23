import Link from "next/link";
import { createPatient } from "@/app/actions";
import { getPatients } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [patients, query] = await Promise.all([getPatients(), searchParams]);

  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow green">Espacio profesional</span><h1>Pacientes</h1><p>Un lugar para preparar y revisar cada seguimiento.</p></div>
      </div>
      {query.error && <div className="alert" role="alert">Revisá los datos del paciente e intentá nuevamente.</div>}
      <div className="columns">
        <section className="card">
          <div className="section-heading"><div><h2>Listado</h2><p>{patients.length} pacientes en esta prueba local</p></div></div>
          {patients.length ? (
            <div className="patient-list">
              {patients.map((patient) => (
                <Link className="patient-row" href={`/pacientes/${patient.id}`} key={patient.id}>
                  <span className="avatar">{patient.full_name.charAt(0)}</span>
                  <span className="patient-row-main"><strong>{patient.full_name}</strong><small>{patient.goal}</small></span>
                  <span className="row-arrow">→</span>
                </Link>
              ))}
            </div>
          ) : <p className="empty">Todavía no hay pacientes. Agregá el primero para empezar.</p>}
        </section>
        <section className="card">
          <div className="section-heading"><div><h2>Nuevo paciente</h2><p>Usá datos ficticios durante esta etapa.</p></div></div>
          <form action={createPatient} className="form">
            <label>Nombre y apellido<input name="name" required minLength={2} maxLength={120} placeholder="Ej.: Ana Demo" /></label>
            <label>Email opcional<input name="email" type="email" maxLength={160} placeholder="ana@example.test" /></label>
            <label>Objetivo inicial<textarea name="goal" required minLength={3} maxLength={500} placeholder="¿Qué busca trabajar este paciente?" /></label>
            <button className="button" type="submit">Crear paciente</button>
            <span className="form-help">Esta versión todavía no tiene cuentas ni permisos para datos clínicos reales.</span>
          </form>
        </section>
      </div>
    </>
  );
}
