# NutriProgressFit · MVP local

Primer circuito funcional para validar el seguimiento nutricional: pacientes, planes y controles. El archivo `NutriProgressFit_V12_corregido.html` se conserva como referencia del concepto original.

## Requisitos

- Node.js 20.9 o superior
- npm
- Docker con Compose

## Iniciar en local

```bash
docker compose up -d db
cd web
cp .env.example .env.local
npm install
npm run dev
```

Abrí [http://127.0.0.1:3000](http://127.0.0.1:3000). La base se inicia con una profesional y dos pacientes **ficticios**. PostgreSQL queda disponible solo en `127.0.0.1:5433`.

Para detener PostgreSQL: `docker compose down` desde la raíz. El volumen conserva los datos. Si se modifica `db/init/001_schema.sql`, habrá que aplicar una migración; los scripts de inicio solo corren con un volumen nuevo.

## Alcance actual

- Panel profesional con resumen de actividad.
- Alta y listado de pacientes.
- Ficha de paciente con objetivo, planes y controles.
- Formularios validados en el servidor y datos persistidos en PostgreSQL.

## Límite de esta versión

Este entorno **solo acepta datos ficticios**. Aún no hay autenticación, consentimiento, registro de auditoría ni portal del paciente. Las lecturas y escrituras se bloquean fuera de `NODE_ENV=development` con `LOCAL_DEMO_ONLY=true`. No debe publicarse ni usarse con pacientes reales hasta implementar y revisar esos controles.

## Estructura

- `web/`: aplicación Next.js y TypeScript.
- `db/init/001_schema.sql`: esquema inicial y datos de prueba.
- `compose.yaml`: PostgreSQL local.
- `NutriProgressFit_V12_corregido.html`: prototipo original.
