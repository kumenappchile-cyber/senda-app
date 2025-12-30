// lib/program.ts
import { Program } from "./types";
import { PERSONAL_VALUES } from "./values";

/**
 * Programa base (MVP) — Cuaderno 2 completo + Cuaderno 3 (28 días)
 * Nota: Cuaderno 2 basado en "Cuaderno 2 - La Caverna y el Reflejo".
 * Cuaderno 3 basado en "Cuaderno 3 - El Desafío de la Montaña".
 */

export const program: Program = {
  modules: [
    {
      id: "cuaderno-2",
      title: "Cuaderno 2 — La Caverna y el Reflejo",
      subtitle:
        "Un diagnóstico honesto y el reflejo nítido de la vida que eliges vivir.",
      blockIds: ["c2-b1", "c2-b2", "c2-b3", "c2-b4", "c2-cierre"],
    },

    // =========================
    // CUADERNO 3
    // =========================
    {
      id: "cuaderno-3",
      title: "Cuaderno 3 — El Desafío de la Montaña",
      subtitle: "28 días para sostener la transformación con hábitos y presencia.",
      blockIds: ["c3-dias"],
    },
  ],

  blocks: [
    // =========================
    // CUADERNO 2
    // =========================
    {
      id: "c2-b1",
      moduleId: "cuaderno-2",
      title: "Bloque 1 — La Caverna",
      subtitle: "Enfrentando tu realidad",
      exerciseIds: ["c2-b1-e1", "c2-b1-e2", "c2-b1-e3"],
    },
    {
      id: "c2-b2",
      moduleId: "cuaderno-2",
      title: "Bloque 2 — El Reflejo",
      subtitle: "Proyectando tu nueva vida",
      exerciseIds: ["c2-b2-e1", "c2-b2-e2", "c2-b2-e3"],
    },
    {
      id: "c2-b3",
      moduleId: "cuaderno-2",
      title: "Bloque 3 — El Encuentro",
      subtitle: "Yo actual vs Yo del futuro",
      exerciseIds: ["c2-b3-e1", "c2-b3-e2"],
    },
    {
      id: "c2-b4",
      moduleId: "cuaderno-2",
      title: "Bloque 4 — Liberando Espacio",
      subtitle: "Crear espacio real para sostener la transformación",
      exerciseIds: ["c2-b4-e1", "c2-b4-e2", "c2-b4-e3", "c2-b4-e4"],
    },
    {
      id: "c2-cierre",
      moduleId: "cuaderno-2",
      title: "Cierre",
      subtitle: "Compromiso con el Desafío de la Montaña",
      exerciseIds: ["c2-cierre-compromiso"],
    },

    // =========================
    // CUADERNO 3
    // =========================
    {
      id: "c3-dias",
      moduleId: "cuaderno-3",
      title: "Los 28 días",
      subtitle: "Un día a la vez. Presencia, acción y honestidad.",
      exerciseIds: [
        "c3-d01",
        "c3-d02",
        "c3-d03",
        "c3-d04",
        "c3-d05",
        "c3-d06",
        "c3-d07",
        "c3-d08",
        "c3-d09",
        "c3-d10",
        "c3-d11",
        "c3-d12",
        "c3-d13",
        "c3-d14",
        "c3-d15",
        "c3-d16",
        "c3-d17",
        "c3-d18",
        "c3-d19",
        "c3-d20",
        "c3-d21",
        "c3-d22",
        "c3-d23",
        "c3-d24",
        "c3-d25",
        "c3-d26",
        "c3-d27",
        "c3-d28",
      ],
    },
  ],

  exercises: [
    // =========================
    // CUADERNO 2 — BLOQUE 1
    // =========================
    {
      id: "c2-b1-e1",
      moduleId: "cuaderno-2",
      blockId: "c2-b1",
      title: "Ejercicio 1 — Enfrentando tu Realidad Actual",
      subtitle: "No es para juzgarte. Es para ver con claridad.",
      screens: [
        {
          id: "s1",
          title: "Entrada",
          intro: "Respira. No tienes que cambiar nada ahora. Solo mirar.",
          fields: [
            { id: "nombre", type: "text", label: "Yo,", placeholder: "Tu nombre" },
            {
              id: "dia",
              type: "text",
              label: "en el día",
              placeholder: "Fecha (ej: 28-12-2025)",
            },
          ],
        },
        {
          id: "s2",
          title: "Tu vida hoy",
          fields: [
            {
              id: "p1",
              type: "text",
              multiline: true,
              label:
                "1) ¿Cómo te sientes respecto a tu vida hoy? ¿Te sientes satisfecho con ella? ¿Cuáles son las principales áreas que te generan insatisfacción y por qué?",
            },
            {
              id: "p2",
              type: "text",
              multiline: true,
              label:
                "2) ¿Dónde trabajas y qué haces allí? ¿Estás conforme con tu trabajo?",
            },
          ],
        },
        {
          id: "s3",
          title: "Finanzas (claridad, no juicio)",
          fields: [
            {
              id: "p3",
              type: "text",
              multiline: true,
              label:
                "3) ¿Cómo está tu vida financiera? ¿Sabes exactamente cuánto ganas y cuánto gastas al mes? ¿Llevas algún tipo de organización de tus finanzas?",
            },
            {
              id: "p4_tabla",
              type: "table",
              label: "4) Completa la tabla a continuación",
              columns: [{ key: "valor", label: "Valor actual ($)", type: "number" }],
              rows: [
                { id: "salario", label: "Salario / Ingreso mensual" },
                { id: "saldo", label: "Saldo en cuenta corriente" },
                { id: "inv", label: "Inversiones" },
                { id: "deudas", label: "Deudas" },
              ],
            },
          ],
        },
        {
          id: "s4",
          title: "Tu espacio",
          fields: [
            {
              id: "p5",
              type: "text",
              multiline: true,
              label:
                "5) ¿Dónde vives actualmente? ¿Estás satisfecho con tu hogar? ¿Qué aspectos de tu espacio físico te generan bienestar y cuáles te generan incomodidad o frustración?",
            },
            {
              id: "p6",
              type: "text",
              multiline: true,
              label:
                "6) ¿Cómo es tu relación de pareja (si aplica)? ¿Te sientes acompañado, comprendido y apoyado? ¿Hay algo que te gustaría mejorar?",
            },
          ],
        },
        {
          id: "s5",
          title: "Relaciones",
          fields: [
            {
              id: "p7",
              type: "text",
              multiline: true,
              label:
                "7) ¿Cómo es tu relación con tu familia? ¿Sientes conexión, apoyo y armonía? ¿Hay conflictos o situaciones pendientes?",
            },
            {
              id: "p8",
              type: "text",
              multiline: true,
              label:
                "8) ¿Cómo es tu vida social? ¿Tienes amigos cercanos? ¿Te sientes conectado con tu círculo social o te sientes aislado?",
            },
          ],
        },
        {
          id: "s6",
          title: "Consumo y entorno digital",
          fields: [
            {
              id: "p9",
              type: "text",
              multiline: true,
              label:
                "9) ¿Cuántos grupos de WhatsApp tienes? ¿Aportan valor o solo te distraen? ¿Qué sientes al abrir WhatsApp?",
            },
            {
              id: "p10",
              type: "text",
              multiline: true,
              label:
                "10) ¿Cuánto tiempo pasas en redes sociales? ¿Qué tipo de contenido consumes y cómo te hace sentir?",
            },
          ],
        },
        {
          id: "s7",
          title: "Tu cuerpo",
          fields: [
            {
              id: "p11",
              type: "text",
              multiline: true,
              label:
                "11) ¿Cómo está tu salud? ¿Te has hecho chequeos recientes? ¿Cómo está tu energía en el día a día?",
            },
            {
              id: "p12",
              type: "text",
              multiline: true,
              label:
                "12) ¿Haces ejercicio? ¿Con qué frecuencia? ¿Qué te impide hacerlo si no lo haces?",
            },
          ],
        },
        {
          id: "s8",
          title: "Sueño, ansiedad, espiritualidad",
          fields: [
            {
              id: "p13",
              type: "text",
              multiline: true,
              label:
                "13) ¿Cómo duermes? ¿Descansas? ¿Qué hábitos tienes antes de dormir?",
            },
            {
              id: "p14",
              type: "text",
              multiline: true,
              label:
                "14) ¿Sientes ansiedad o miedo con frecuencia? ¿Qué situaciones te activan más?",
            },
          ],
        },
        {
          id: "s9",
          title: "Tu dirección",
          fields: [
            {
              id: "p15",
              type: "text",
              multiline: true,
              label:
                "15) ¿Tienes alguna práctica espiritual o de conexión interior? ¿Qué espacio tiene en tu vida hoy?",
            },
            {
              id: "p16",
              type: "text",
              multiline: true,
              label:
                "16) ¿Cómo gestionas tu tiempo? ¿Sientes que lo controlas o que el día te controla a ti?",
            },
          ],
        },
        {
          id: "s10",
          title: "Si nada cambia",
          fields: [
            {
              id: "p17",
              type: "text",
              multiline: true,
              label:
                "17) ¿Qué hábitos o patrones sientes que más te están frenando hoy?",
            },
            {
              id: "p18",
              type: "text",
              multiline: true,
              label:
                "18) ¿Qué parte de tu vida te duele más mirar con honestidad?",
            },
          ],
        },
        {
          id: "s11",
          title: "Proyección 5 años",
          fields: [
            {
              id: "p19",
              type: "text",
              multiline: true,
              label:
                "19) Si todo sigue igual, ¿cómo crees que será tu vida en 5 años? Describe con detalle.",
            },
          ],
        },
      ],
    },

    {
      id: "c2-b1-e2",
      moduleId: "cuaderno-2",
      blockId: "c2-b1",
      title: "Ejercicio 2 — Mapeando tu Rutina: ¿Dónde está tu Energía?",
      subtitle: "Describe un día típico. No lo mejores: obsérvalo.",
      screens: [
        {
          id: "s1",
          title: "Tu día típico",
          intro: "Describe con detalle cómo transcurre un día típico para ti.",
          fields: [
            {
              id: "rutina",
              type: "text",
              multiline: true,
              label: "Escribe aquí:",
              placeholder: "Desde que despiertas hasta que te acuestas…",
            },
          ],
        },
      ],
    },

    {
      id: "c2-b1-e3",
      moduleId: "cuaderno-2",
      blockId: "c2-b1",
      title: "Ejercicio 3 — Mapeando tus Valores Esenciales",
      subtitle: "Selecciona y prioriza hasta quedarte con 3.",
      screens: [
        {
          id: "s1",
          title: "Valores (paso 1)",
          intro: "Selecciona los valores que resuenan contigo hoy (máximo 20).",
          fields: [
            {
              id: "valores_seleccionados",
              type: "values_select",
              label: "Mis valores",
              max: 20,
              options: PERSONAL_VALUES,
            },
          ],
        },
        {
          id: "s2",
          title: "Valores (paso 2)",
          intro: "Ahora elige tus 3 valores esenciales.",
          fields: [
            { id: "valor_1", type: "text", label: "Valor esencial 1" },
            { id: "valor_2", type: "text", label: "Valor esencial 2" },
            { id: "valor_3", type: "text", label: "Valor esencial 3" },
            {
              id: "valores_reflexion",
              type: "text",
              multiline: true,
              label: "¿Por qué estos 3? ¿Qué cambian en tu forma de vivir?",
            },
          ],
        },
      ],
    },

    // =========================
    // CUADERNO 2 — BLOQUE 2
    // =========================
    {
      id: "c2-b2-e1",
      moduleId: "cuaderno-2",
      blockId: "c2-b2",
      title: "Ejercicio 1 — El Borrador de tu Nuevo Reflejo",
      subtitle: "Escribe en presente, como si ya fuera real.",
      screens: [
        {
          id: "s1",
          title: "Antes de escribir",
          intro:
            "Recuerda: escribe en presente. No como deseo. Como una vida que ya estás habitando.",
          fields: [
            {
              id: "nota_reflejo",
              type: "text",
              multiline: true,
              label:
                "¿Qué sueños tenías antes que fuiste dejando? ¿Qué parte de ti quiere volver a aparecer?",
            },
          ],
        },
        {
          id: "s2",
          title: "Vivienda y finanzas",
          fields: [
            { id: "rf1", type: "text", multiline: true, label: "1) ¿Cómo es tu hogar ideal?" },
            { id: "rf2", type: "text", multiline: true, label: "2) ¿Cómo es tu realidad financiera en esta nueva vida?" },
          ],
        },
        {
          id: "s3",
          title: "Trabajo y vida",
          fields: [
            { id: "rf3", type: "text", multiline: true, label: "3) ¿En qué trabajas y qué haces?" },
            { id: "rf4", type: "text", multiline: true, label: "4) ¿Cómo es tu rutina general (energía, horarios, enfoque)?" },
          ],
        },
        {
          id: "s4",
          title: "Relaciones",
          fields: [
            { id: "rf5", type: "text", multiline: true, label: "5) ¿Cómo es tu relación de pareja (si aplica)?" },
            { id: "rf6", type: "text", multiline: true, label: "6) ¿Cómo es tu relación con tu familia y tu entorno?" },
          ],
        },
        {
          id: "s5",
          title: "Hábitos y salud",
          fields: [
            { id: "rf7", type: "text", multiline: true, label: "7) ¿Qué hábitos sostienen esta vida?" },
            { id: "rf8", type: "text", multiline: true, label: "8) ¿Cómo está tu salud y tu cuerpo en esta nueva vida?" },
          ],
        },
        {
          id: "s6",
          title: "Emoción predominante",
          fields: [
            { id: "rf9", type: "text", multiline: true, label: "9) ¿Qué emoción predomina en tu día a día?" },
            { id: "rf10", type: "text", multiline: true, label: "10) ¿Qué haces con tu tiempo libre?" },
            { id: "rf11", type: "text", multiline: true, label: "11) ¿Qué detalle concreto demuestra que esta vida ya es real?" },
          ],
        },
      ],
    },

    {
      id: "c2-b2-e2",
      moduleId: "cuaderno-2",
      blockId: "c2-b2",
      title: "Ejercicio 2 — Reflexionando sobre mi Nueva Rutina",
      subtitle: "Describe un día ideal en detalle.",
      screens: [
        {
          id: "s1",
          title: "Tu día ideal",
          fields: [
            { id: "dia_ideal", type: "text", multiline: true, label: "Escribe aquí tu día ideal:" },
          ],
        },
      ],
    },

    {
      id: "c2-b2-e3",
      moduleId: "cuaderno-2",
      blockId: "c2-b2",
      title: "Ejercicio 3 — El Nuevo Reflejo de tu Vida (Panel)",
      subtitle: "Crea un panel visual (vision board).",
      screens: [
        {
          id: "s1",
          title: "Panel visual",
          intro:
            "Aquí dejamos el panel como referencia. En el siguiente paso lo transformamos en galería de imágenes (subidas) o links.",
          fields: [
            {
              id: "panel_descripcion",
              type: "text",
              multiline: true,
              label:
                "Describe tu panel (o pega links a Pinterest/Drive/lo que uses):",
            },
          ],
        },
      ],
    },

    // =========================
    // CUADERNO 2 — BLOQUE 3
    // =========================
    {
      id: "c2-b3-e1",
      moduleId: "cuaderno-2",
      blockId: "c2-b3",
      title: "Ejercicio 1 — Tu Yo Actual",
      subtitle: "Sin juicio. Solo honestidad.",
      screens: [
        {
          id: "s1",
          title: "Yo actual",
          fields: [
            { id: "yo_fortalezas", type: "text", multiline: true, label: "Fortalezas" },
            { id: "yo_debilidades", type: "text", multiline: true, label: "Debilidades" },
            { id: "yo_creencias", type: "text", multiline: true, label: "Creencias actuales (limitantes o repetidas)" },
          ],
        },
      ],
    },

    {
      id: "c2-b3-e2",
      moduleId: "cuaderno-2",
      blockId: "c2-b3",
      title: "Ejercicio 2 — Tu Yo del Futuro + Brecha + Reescritura",
      subtitle: "Define el puente entre ambos y reescribe tus códigos.",
      screens: [
        {
          id: "s1",
          title: "Yo del futuro",
          fields: [
            { id: "fut_qual", type: "text", multiline: true, label: "Cualidades del Yo del Futuro" },
            { id: "fut_creencias", type: "text", multiline: true, label: "Creencias fortalecedoras" },
          ],
        },
        {
          id: "s2",
          title: "La brecha",
          fields: [
            { id: "brecha_desarrollar", type: "text", multiline: true, label: "Características a desarrollar" },
            { id: "brecha_soltar", type: "text", multiline: true, label: "Creencias/hábitos a abandonar o transformar" },
            { id: "brecha_cambios", type: "text", multiline: true, label: "Cambios concretos a hacer" },
          ],
        },
        {
          id: "s3",
          title: "Reescribiendo tus códigos internos",
          intro:
            "Tabla: creencia limitante → evidencias contrarias → nueva creencia fortalecedora.",
          fields: [
            {
              id: "tabla_creencias",
              type: "table",
              label:
                "Agrega filas (en MVP, usamos 6 filas fijas; luego lo hacemos dinámico).",
              columns: [
                { key: "limitante", label: "Creencia limitante", type: "text" },
                { key: "evidencias", label: "Evidencias contrarias", type: "text" },
                { key: "nueva", label: "Nueva creencia fortalecedora", type: "text" },
              ],
              rows: [
                { id: "r1", label: "Fila 1" },
                { id: "r2", label: "Fila 2" },
                { id: "r3", label: "Fila 3" },
                { id: "r4", label: "Fila 4" },
                { id: "r5", label: "Fila 5" },
                { id: "r6", label: "Fila 6" },
              ],
            },
          ],
        },
      ],
    },

    // =========================
    // CUADERNO 2 — BLOQUE 4
    // =========================
    {
      id: "c2-b4-e1",
      moduleId: "cuaderno-2",
      blockId: "c2-b4",
      title: "Ejercicio 1 — Organizando tu espacio",
      subtitle: "Casa y trabajo: crear aire.",
      screens: [
        {
          id: "s1",
          title: "Acciones",
          fields: [
            { id: "espacio_acciones", type: "text", multiline: true, label: "¿Qué vas a ordenar o eliminar esta semana?" },
            { id: "espacio_reflexion", type: "text", multiline: true, label: "¿Qué cambia en ti cuando tu espacio está limpio?" },
          ],
        },
      ],
    },

    {
      id: "c2-b4-e2",
      moduleId: "cuaderno-2",
      blockId: "c2-b4",
      title: "Ejercicio 2 — Redes sociales y WhatsApp",
      subtitle: "Filtrar lo que entra.",
      screens: [
        {
          id: "s1",
          title: "Limpieza digital",
          fields: [
            { id: "redes_acciones", type: "text", multiline: true, label: "¿Qué vas a dejar de seguir / silenciar / salir?" },
            { id: "redes_filtro", type: "text", multiline: true, label: "Filtro: ¿la persona que estoy eligiendo ser consumiría esto?" },
          ],
        },
      ],
    },

    {
      id: "c2-b4-e3",
      moduleId: "cuaderno-2",
      blockId: "c2-b4",
      title: "Ejercicio 3 — Notificaciones y límites",
      subtitle: "Menos dopamina, más presencia.",
      screens: [
        {
          id: "s1",
          title: "Límites",
          fields: [
            { id: "notif_cambios", type: "text", multiline: true, label: "¿Qué notificaciones vas a desactivar hoy?" },
            { id: "notif_limites", type: "text", multiline: true, label: "¿Qué límite concreto pondrás (tiempo / horario / apps)?" },
          ],
        },
      ],
    },

    {
      id: "c2-b4-e4",
      moduleId: "cuaderno-2",
      blockId: "c2-b4",
      title: "Ejercicio 4 — Finanzas (orden práctico)",
      subtitle: "Visibilidad y decisión.",
      screens: [
        {
          id: "s1",
          title: "Plan",
          fields: [
            { id: "fin_metodo", type: "text", multiline: true, label: "Describe cómo vas a registrar tus gastos (grupo WhatsApp / lista / planilla)." },
            { id: "fin_reflexion", type: "text", multiline: true, label: "¿Qué suele haber detrás de tus compras impulsivas?" },
          ],
        },
      ],
    },

    // =========================
    // CUADERNO 2 — CIERRE
    // =========================
    {
      id: "c2-cierre-compromiso",
      moduleId: "cuaderno-2",
      blockId: "c2-cierre",
      title: "Compromiso con el Desafío de la Montaña",
      subtitle: "Un acto simple. Un inicio claro.",
      screens: [
        {
          id: "s1",
          title: "Firma",
          intro:
            "En el siguiente paso implementamos firma real (canvas). En MVP, lo dejamos como nombre + fecha.",
          fields: [
            { id: "firma_nombre", type: "text", label: "Nombre" },
            { id: "firma_fecha_inicio", type: "text", label: "Fecha de inicio (YYYY-MM-DD)" },
            { id: "firma_fecha_fin", type: "text", label: "Fecha de finalización (YYYY-MM-DD)" },
            { id: "firma_compromiso", type: "checkbox", label: "Acepto este compromiso conmigo mismo." },
          ],
        },
      ],
    },

    // =========================
    // CUADERNO 3 — 28 DÍAS
    // =========================
    ...buildCuaderno3Exercises(),
  ],
};

// Helpers
export function getModule(moduleId: string) {
  return program.modules.find((m) => m.id === moduleId);
}
export function getBlocks(moduleId: string) {
  return program.blocks.filter((b) => b.moduleId === moduleId);
}
export function getExercisesByBlock(blockId: string) {
  const b = program.blocks.find((x) => x.id === blockId);
  if (!b) return [];
  return program.exercises.filter((e) => b.exerciseIds.includes(e.id));
}
export function getExercise(exerciseId: string) {
  return program.exercises.find((e) => e.id === exerciseId);
}
export function getNextExerciseId(currentExerciseId: string): string | null {
  // Orden: según el orden dentro de cada bloque, y bloques según module.blockIds
  const current = getExercise(currentExerciseId);
  if (!current) return null;

  const module = getModule(current.moduleId);
  if (!module) return null;

  const ordered: string[] = [];
  for (const blockId of module.blockIds) {
    const b = program.blocks.find((x) => x.id === blockId);
    if (!b) continue;
    ordered.push(...b.exerciseIds);
  }

  const idx = ordered.indexOf(currentExerciseId);
  if (idx < 0) return null;

  return ordered[idx + 1] ?? null;
}

// =========================
// Cuaderno 3 builder (para no inflar visualmente el archivo)
// =========================
function buildCuaderno3Exercises(): Program["exercises"] {
  const daily = (day: number, question: string) => ({
    id: `c3-d${String(day).padStart(2, "0")}`,
    moduleId: "cuaderno-3",
    blockId: "c3-dias",
    title: `Día ${day} — El Desafío de la Montaña`,
    subtitle: "Un día a la vez. Presencia, acción y honestidad.",
    screens: [
      {
        id: "s1",
        title: "Agradezco y declaro",
        intro: "Escribe sin perfección. Solo presencia.",
        fields: [
          {
            id: "agradecimientos_5",
            type: "text",
            multiline: true,
            label: "Mis 5 agradecimientos diarios:",
          },
          {
            id: "manifestaciones_5",
            type: "text",
            multiline: true,
            label: "Mis 5 manifestaciones diarias (en presente):",
          },
          {
            id: "cosas_buenas_5",
            type: "text",
            multiline: true,
            label: "Las 5 cosas buenas sobre mí mismo(a):",
          },
        ],
      },
      {
        id: "s2",
        title: "Prioridades y claridad",
        fields: [
          {
            id: "prioridades",
            type: "text",
            multiline: true,
            label: "Mis prioridades del día:",
          },
          {
            id: "ideas_revelaciones",
            type: "text",
            multiline: true,
            label: "Espacio para ideas y revelaciones:",
          },
          {
            id: "reflexiones",
            type: "text",
            multiline: true,
            label: "Espacio libre para reflexiones y autoanálisis:",
          },
        ],
      },
      {
        id: "s3",
        title: "Compromiso y hábitos",
        intro:
          "Marca lo que sostuviste hoy. Si no, no pasa nada: observa con honestidad.",
        fields: [
          { id: "compromiso", type: "text", label: "Hoy me comprometí con:" },
          { id: "compromiso_hora", type: "text", label: "Hora:" },
          { id: "logre", type: "text", multiline: true, label: "Hoy logré:" },

          { id: "hab_activacion", type: "checkbox", label: "Activación del cuerpo físico" },
          { id: "hab_alimentacion", type: "checkbox", label: "Alimentación balanceada" },
          { id: "hab_sueno", type: "checkbox", label: "Sueño regulado" },
          { id: "hab_hidratacion", type: "checkbox", label: "Hidratación" },
          { id: "hab_lectura", type: "checkbox", label: "Lectura diaria" },

          {
            id: "hab_sin_compulsiones",
            type: "checkbox",
            label: "Mantenerme sin alcohol, drogas, pornografía y otras compulsiones",
          },
          {
            id: "hab_no_norte",
            type: "checkbox",
            label: "Decir “no” a lo que no le sirve a mi norte",
          },
          {
            id: "hab_interrumpir_patrones",
            type: "checkbox",
            label: "Percibir e interrumpir patrones automáticos",
          },

          {
            id: "pregunta_reflexion",
            type: "text",
            multiline: true,
            label: `Pregunta de Reflexión del Día: ${question}`,
          },
        ],
      },
    ],
  });

  const questions: Record<number, string> = {
    1: "¿Qué pensamiento automático de mi viejo yo observé hoy?",
    2: "¿En qué momento sentí que mi cuerpo me pedía una emoción negativa familiar?",
    3: "¿Qué creencia antigua noté que se repetía hoy?",
    4: "¿Qué me hizo reaccionar en automático y cómo me di cuenta?",
    5: "¿En qué momento me di cuenta de que estaba repitiendo una vieja historia sobre mí mismo(a)?",
    6: "¿Qué necesidad profunda estaba intentando cubrir con un impulso?",
    7: "¿Qué parte de mí intentó sabotear mi avance hoy y cómo lo noté?",
    8: "¿Qué hábito me dio más poder hoy y por qué?",
    9: "¿Qué hábito me costó más sostener hoy y qué aprendí de eso?",
    10: "¿Qué hice hoy que mi yo futuro me agradecería?",
    11: "¿Qué excusa apareció hoy y qué había debajo de esa excusa?",
    12: "¿Qué me enseñó hoy mi cuerpo sobre mi energía y mi enfoque?",
    13: "¿Qué parte de mi vida se está ordenando primero y qué me muestra eso?",
    14: "¿Qué relación noté que se fortalece cuando yo estoy presente?",
    15: "¿Qué emoción me dominó hoy y qué hice distinto a otras veces?",
    16: "¿Qué decisión pequeña tomé hoy que cambió mi rumbo?",
    17: "¿Qué me dice mi atención (en qué se fue) sobre mi identidad actual?",
    18: "¿Qué situación activó mi viejo patrón y qué señal temprana pude reconocer?",
    19: "¿Qué hice hoy para cuidar mi norte, aunque fuera mínimo?",
    20: "¿Qué me mostró hoy el silencio (o la pausa) que antes no veía?",
    21: "¿Qué límite puse hoy y cómo cambió mi estado interno?",
    22: "¿Qué parte de mí se siente más libre hoy y por qué?",
    23: "¿Qué conversación interna tuve hoy y cómo puedo reescribirla con amor y firmeza?",
    24: "¿Qué acto de coherencia hice hoy, aunque nadie lo viera?",
    25: "¿Qué me está pidiendo mi vida nueva que aún no estoy entregando del todo?",
    26: "¿Qué hábito ya se siente más natural y qué me dice eso de mi transformación?",
    27: "¿Qué parte de mi identidad antigua ya no calza conmigo?",
    28: "¿Cómo guio mi día el yo en el que me estoy convirtiendo? ¡Felicitaciones, has llegado a la cima!",
  };

  const out = [];
  for (let d = 1; d <= 28; d++) out.push(daily(d, questions[d]));
  return out as any;
}
