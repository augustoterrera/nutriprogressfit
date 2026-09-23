import "server-only";

export const DEMO_PROFESSIONAL_ID = "00000000-0000-4000-8000-000000000001";

export function assertLocalDemo() {
  if (process.env.NODE_ENV !== "development" || process.env.LOCAL_DEMO_ONLY !== "true") {
    throw new Error("Esta versión de prueba solo funciona en desarrollo local.");
  }
}
