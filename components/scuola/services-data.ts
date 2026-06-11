import {
  Baby,
  BadgeCheck,
  BookOpen,
  CircleCheck,
  Handshake,
  HeartHandshake,
  Palette,
  PartyPopper,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type Accent = "rosa" | "blue" | "green";

export type ServiceTab = {
  id: string;
  /** Kurzes Label für die Reiter-Navigation. */
  label: string;
  /** Titel-Aufteilung: normaler Vorlauf + hervorgehobener (fett) Name. */
  titleLead: string;
  titleStrong: string;
  icon: LucideIcon;
  accent: Accent;
  downloadLabel: string;
  features: Feature[];
};

/** Gemeinsame Feature-Liste für Infanzia & Primaria (laut Design identisch). */
const scuolaFeatures: Feature[] = [
  {
    icon: CircleCheck,
    title: "Percorso scolastico completo dalla prima alla quinta classe",
    text: "La Scuola Primaria accompagna i bambini dalla prima alla quinta classe in un ambiente sereno, stimolante e attento alla crescita personale e scolastica di ogni alunno.",
  },
  {
    icon: CircleCheck,
    title: "Insegnanti qualificati e attenzione personalizzata agli alunni",
    text: "Ogni bambino viene seguito con cura da insegnanti qualificati che valorizzano le capacità individuali, promuovendo fiducia, autonomia e desiderio di apprendere.",
  },
  {
    icon: CircleCheck,
    title: "Insegnamento delle lingue straniere come inglese e spagnolo",
    text: "L’offerta formativa comprende anche l’insegnamento dell’inglese e dello spagnolo, permettendo agli alunni di sviluppare competenze linguistiche fin dai primi anni scolastici.",
  },
  {
    icon: CircleCheck,
    title: "Struttura con cortili, giardino privato e spazi per attività sportive",
    text: "Gli alunni possono vivere la quotidianità scolastica in ambienti ampi e accoglienti, con cortili, giardino e spazi dedicati alle attività sportive e ricreative.",
  },
  {
    icon: CircleCheck,
    title: "Ambiente educativo che promuove crescita culturale, relazionale e personale",
    text: "La Scuola Primaria promuove non solo l’apprendimento scolastico, ma anche il rispetto, la collaborazione e la crescita emotiva e relazionale di ogni bambino.",
  },
];

export const serviceTabs: ServiceTab[] = [
  {
    id: "nido",
    label: "Nido d’Infanzia",
    titleLead: "Nido d’Infanzia – ",
    titleStrong: "Le Ali del Paradiso",
    icon: Baby,
    accent: "rosa",
    downloadLabel: "Inscriviti al Nido – Scarica il modulo (681 KB)",
    features: [
      {
        icon: HeartHandshake,
        title: "Accoglienza per bambini dai 18 mesi",
        text: "Il Nido accoglie i bambini a partire dai 18 mesi in un ambiente sicuro, sereno e pensato per accompagnare con dolcezza i primi anni di crescita.",
      },
      {
        icon: Users,
        title: "Ambiente sereno, sicuro e familiare",
        text: "Ogni bambino viene seguito con attenzione e cura all’interno di un contesto educativo tranquillo, dove sentirsi accolti e protetti ogni giorno.",
      },
      {
        icon: Sprout,
        title: "Spazi dedicati, giardino recintato e aree per il gioco all’aperto",
        text: "Il Nido dispone di ambienti pensati per i più piccoli, con aree sicure e spazi esterni dove giocare, esplorare e vivere esperienze all’aria aperta.",
      },
      {
        icon: Handshake,
        title: "Inserimento accompagnato con attenzione alle esigenze di ogni famiglia",
        text: "L’inserimento e il percorso educativo vengono accompagnati in costante dialogo con le famiglie, per garantire serenità e continuità.",
      },
      {
        icon: PartyPopper,
        title: "Sviluppo dell’autonomia attraverso gioco ed esperienze quotidiane",
        text: "Le esperienze proposte stimolano curiosità, creatività e scoperta, rispettando i tempi e le esigenze di ogni bambino.",
      },
      {
        icon: BadgeCheck,
        title: "Nido accreditato",
        text: "Il nostro Nido è un servizio accreditato che garantisce standard educativi e organizzativi di alta qualità. L’ambiente è sicuro, attento e pensato per accompagnare i bambini nei primi anni di vita con cura, professionalità e rispetto dei loro tempi di crescita.",
      },
    ],
  },
  {
    id: "infanzia",
    label: "Scuola dell’Infanzia",
    titleLead: "Scuola dell’Infanzia – ",
    titleStrong: "Principessa Adele Borghese",
    icon: Palette,
    accent: "blue",
    downloadLabel: "Inscriviti alla Infanzia – Scarica il modulo (681 KB)",
    features: scuolaFeatures,
  },
  {
    id: "primaria",
    label: "Scuola Primaria",
    titleLead: "Scuola Primaria – ",
    titleStrong: "Duchi Salviati",
    icon: BookOpen,
    accent: "green",
    downloadLabel: "Inscriviti al Primaria – Scarica il modulo (681 KB)",
    features: scuolaFeatures,
  },
];

/** Statische Klassen je Akzentfarbe (Tailwind braucht vollständige Klassennamen). */
export const accentClasses: Record<
  Accent,
  { solidButton: string; activeTag: string; check: string }
> = {
  rosa: {
    solidButton: "bg-rosa border-rosa hover:bg-rosa/90",
    activeTag: "border-rosa",
    check: "text-rosa",
  },
  blue: {
    solidButton: "bg-blue border-blue hover:bg-blue/90",
    activeTag: "border-blue",
    check: "text-blue",
  },
  green: {
    solidButton: "bg-green border-green hover:bg-green/90",
    activeTag: "border-green",
    check: "text-green",
  },
};
