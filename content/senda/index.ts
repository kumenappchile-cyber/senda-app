// content/senda/index.ts

export type SendaUnitId =
  | "empieza-aqui"
  | "cuaderno-1"
  | "cuaderno-2"
  | "cuaderno-3"
  | "bonos";

export type SendaUnit = {
  id: SendaUnitId;
  title: string;
  subtitle?: string;
  href: string;
  order: number;
};

export const SENDA_UNITS: SendaUnit[] = [
  {
    id: "empieza-aqui",
    title: "Empieza aquí",
    subtitle: "Una orientación breve para iniciar sin apuro.",
    href: "/senda",
    order: 0,
  },
  {
    id: "cuaderno-1",
    title: "Cuaderno 1 — La Senda de la Manifestación",
    subtitle: "Fundamentos y dirección del viaje.",
    href: "/senda/cuaderno-1",
    order: 1,
  },
  {
    id: "cuaderno-2",
    title: "Cuaderno 2 — La Caverna y el Reflejo",
    subtitle: "Realidad actual + reflejo futuro con claridad.",
    href: "/senda/cuaderno-2",
    order: 2,
  },
  {
    id: "cuaderno-3",
    title: "Cuaderno 3 — El Desafío de la Montaña",
    subtitle: "28 días de práctica para encarnar el reflejo.",
    href: "/senda/cuaderno-3",
    order: 3,
  },
  {
    id: "bonos",
    title: "Bonos",
    subtitle: "Herramientas de apoyo (dopamina, claridad, planificación).",
    href: "/senda/bonos",
    order: 4,
  },
];

export type BonusId = "dopamina" | "minimalismo-mental" | "planificador";

export type Bonus = {
  id: BonusId;
  title: string;
  subtitle?: string;
  href: string;
};

export const SENDA_BONUSES: Bonus[] = [
  {
    id: "dopamina",
    title: "Mini-curso — Desintoxicación digital y control de dopamina",
    subtitle: "Menos ruido, más presencia.",
    href: "/senda/bonos/dopamina",
  },
  {
    id: "minimalismo-mental",
    title: "Minimalismo mental",
    subtitle: "Reducir el caos interno y crear claridad.",
    href: "/senda/bonos/minimalismo-mental",
  },
  {
    id: "planificador",
    title: "Planificador diario y semanal",
    subtitle: "Estructura suave para sostener el avance.",
    href: "/senda/bonos/planificador",
  },
];
