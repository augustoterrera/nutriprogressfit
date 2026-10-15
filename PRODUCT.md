# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primario: licenciada o licenciado en nutrición matriculado en Argentina** que atiende de forma independiente, en consultorio propio u online. Usa la app **durante la consulta**, con el paciente enfrente (en compu o tablet), y **entre consultas**, para armar planes y revisar cómo viene cada paciente.
- **Secundario: el paciente de esa nutricionista.** Usa la app desde el celular para ver su plan y registrar lo que come, con fotos. Siempre está vinculado a su profesional: no es una app de autoservicio.
- El primer usuario real es un nutricionista del equipo fundador. El prototipo original también lo armó un nutricionista.
- Fuera del MVP por ahora: entrenadores, administración de la plataforma y pacientes sin profesional.

## Product Purpose

NutriProgressFit es la herramienta de trabajo de la nutricionista independiente argentina. Le permite gestionar sus pacientes, armar planes alimentarios con ayuda de IA y seguir la adherencia del paciente entre una consulta y otra.

Existe porque hoy esos profesionales trabajan con Excel, Canva y WhatsApp, o con herramientas extranjeras que cobran en dólares y no están pensadas para Argentina.

El éxito se ve así:
- La nutricionista arma un plan en minutos y lo entrega con su propia marca.
- Al abrir la consulta, sabe cómo le fue al paciente desde la vez anterior.
- El paciente registra lo que come sin fricción.

## Positioning

- **La IA propone, la nutricionista decide.** ATLAS IA arma borradores y la profesional matriculada los revisa, los edita y los firma. Nunca al revés. Es una convicción del producto y además una exigencia legal.
- **Conecta al paciente con su profesional.** El registro diario del paciente alimenta la consulta. Las apps de autoservicio (Fitia, MyFitnessPal, Yazio) no conectan con un nutricionista.
- **Hecho por y para nutricionistas argentinos.** Habla en voseo, usa alimentos y medidas locales y está pensado para cobrar en pesos.

## Operating Context

- **En la consulta (presencial u online):** la nutricionista alterna la mirada entre la pantalla y el paciente. La interfaz no puede exigir atención total ni esconder lo importante detrás de muchos clics.
- **Entre consultas:** arma y ajusta planes, y revisa los registros del paciente con sus fotos.
- **El plan se entrega en PDF** con la identidad de la profesional, mostrando kcal y macros. Hoy muchos pacientes lo reciben por WhatsApp.
- **Datos de referencia del oficio:** tablas de composición de alimentos, fórmulas de gasto energético (Mifflin-St Jeor, Harris-Benedict, FAO/OMS, entre otras), antropometría ISAK y micronutrientes.

## Capabilities and Constraints

**MVP acordado (14 de octubre de 2026):**
- Pacientes: ficha y seguimiento.
- Armador de planes con IA: la IA genera un borrador editable y la nutricionista lo emite.
- PDF del plan con kcal y macros.
- Registro diario del paciente con fotos, desde el celular (web responsive).

**Fuera del MVP por ahora:** marketplace de consultas, tienda, comunidad profesional, dispositivos y wearables, rol de entrenador y panel de administración.

**Restricciones legales (Argentina):**
- Solo un licenciado en nutrición diseña, prescribe y evalúa planes alimentarios (Res. 2619/2023, Ley 24.301 en CABA y leyes provinciales). Un entrenador no entrega dietas.
- La IA solo puede ser apoyo de la decisión profesional, con supervisión (Decreto 98/2023). Si hay un chat para el paciente, no prescribe: da educación general y deriva a la profesional.
- Los datos de salud son datos sensibles (Ley 25.326). Se necesita consentimiento expreso, y por separado para el uso de IA y de fotos.
- La historia clínica (Ley 26.529) tiene que ser inalterable, con registro de cambios, guardada 10 años y con copia disponible para el paciente.
- La tabla SARA 2 tiene licencia no comercial (CC BY-NC-SA). Para usarla hace falta autorización del Ministerio de Salud o una fuente alternativa.

**Mercado e idioma:** Argentina, español rioplatense (es-AR).

**Sin decidir:**
- Base de alimentos definitiva.
- Proveedor de IA.
- Nombres definitivos del producto y de la IA.

## Brand Commitments

- **Los nombres "NutriProgressFit" y "ATLAS IA" son provisorios.** Los dos pueden cambiar, así que nada debería depender de ellos de forma irreversible.
- **Voz: voseo cercano, cálido y directo,** como habla una nutricionista argentina con sus pacientes ("Registrá lo que comiste hoy"). Vale tanto para la profesional como para el paciente.

## Evidence on Hand

- `NutriProgressFit_V12_corregido.html` es el prototipo navegable original. Muestra el concepto, los roles y las secciones. No tiene datos reales ni lógica funcional.
- Un nutricionista del equipo vio el prototipo y le gustó. Es la única validación que hay.
- **No hay** usuarios, clientes, testimonios, métricas ni casos de éxito: no hay que inventarlos.

## Product Principles

1. **La profesional decide.** Todo lo que genera la IA se distingue como tal, se puede editar y no se entrega sin la aprobación de la nutricionista.
2. **Funciona con el paciente enfrente.** Rápido de leer y de operar, sin exigir atención total durante la consulta.
3. **La adherencia tiene que verse.** Lo que el paciente registra entre consultas le llega a la profesional de forma clara y resumida.
4. **Argentino por defecto.** Voseo, alimentos y medidas locales, y el contexto real del consultorio argentino.
5. **Los datos de salud se cuidan.** Consentimiento claro, nada se borra de la historia clínica y se pide solo lo necesario.
