CREATE TABLE professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES professionals(id),
  full_name text NOT NULL,
  email text,
  goal text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX patients_professional_created_idx
  ON patients (professional_id, created_at DESC);

CREATE TABLE checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id),
  recorded_on date NOT NULL,
  weight_kg numeric(5, 1),
  note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX checkins_patient_date_idx
  ON checkins (patient_id, recorded_on DESC, created_at DESC);

CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX plans_patient_created_idx
  ON plans (patient_id, created_at DESC);

-- Los datos iniciales son ficticios y sirven exclusivamente para probar en local.
INSERT INTO professionals (id, full_name)
VALUES ('00000000-0000-4000-8000-000000000001', 'Nutricionista de prueba');

INSERT INTO patients (id, professional_id, full_name, email, goal, created_at)
VALUES
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'María Demo', 'maria@example.test', 'Organizar comidas y mejorar hábitos', now() - interval '10 days'),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'Carlos Demo', 'carlos@example.test', 'Mejorar el rendimiento deportivo', now() - interval '4 days');
