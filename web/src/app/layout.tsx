import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriProgressFit · MVP local",
  description: "Prototipo local para validar el seguimiento nutricional.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="topbar">
          <Link className="brand" href="/"><span className="brand-icon">✳</span> NutriProgress<span>Fit</span></Link>
          <span className="demo-chip">Entorno local de prueba</span>
        </header>
        <div className="shell">
          <aside className="sidebar">
            <div className="sidebar-label">ESPACIO PROFESIONAL</div>
            <nav aria-label="Navegación principal">
              <Link href="/">◫ <span>Inicio</span></Link>
              <Link href="/pacientes">♙ <span>Pacientes</span></Link>
            </nav>
            <div className="sidebar-note">Primera versión para probar el circuito de atención con datos ficticios.</div>
          </aside>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
