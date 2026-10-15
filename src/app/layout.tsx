import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriProgressFit",
  description: "Herramienta de trabajo para nutricionistas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
