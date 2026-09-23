import Link from "next/link";
import { getDashboard, getPatients } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [summary, patients] = await Promise.all([getDashboard(), getPatients()]);

  return (
    <>
      <section className="hero">
        <span className="eyebrow">MVP local · Nutrición</span>
        <h1>Un seguimiento más claro para cada paciente.</h1>
        <p>Registrá pacientes, armá planes y seguí su evolución desde un solo lugar.</p>
        <Link className="button button-light" href="/pacientes">Ver pacientes →</Link>
      </section>

      <section className="stats" aria-label="Resumen">
        <div className="stat"><span>Pacientes</span><strong>{summary.patients}</strong></div>
        <div className="stat"><span>Controles registrados</span><strong>{summary.checkins}</strong></div>
        <div className="stat"><span>Planes creados</span><strong>{summary.plans}</strong></div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div><span className="eyebrow green">Trabajo diario</span><h2>Pacientes recientes</h2></div>
          <Link className="text-link" href="/pacientes">Ver todos →</Link>
        </div>
        <div className="patient-list">
          {patients.slice(0, 5).map((patient) => (
            <Link className="patient-row" href={`/pacientes/${patient.id}`} key={patient.id}>
              <span className="avatar">{patient.full_name.charAt(0)}</span>
              <span className="patient-row-main"><strong>{patient.full_name}</strong><small>{patient.goal}</small></span>
              <span className="row-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
