import { Baby, BookOpen, Palette, type LucideIcon } from "lucide-react";

import type { Accent } from "@/components/scuola/services-data";

export interface ModuloItem {
  title: string;
  text?: string;
  size: string;
}

export interface ModulisticaSchool {
  id: string;
  label: string;
  titleLead: string;
  titleStrong: string;
  icon: LucideIcon;
  accent: Accent;
  items: ModuloItem[];
}

export const modulisticaSchools: ModulisticaSchool[] = [
  {
    id: "nido",
    label: "Nido d’Infanzia",
    titleLead: "Nido d’Infanzia –",
    titleStrong: "Le Ali del Paradiso",
    icon: Baby,
    accent: "rosa",
    items: [
      {
        title: "Modulo di Iscrizione al Nido",
        text: "Scarica il modulo di iscrizione al Nido e compilalo per avviare la procedura di ammissione del tuo bambino.",
        size: "681 KB",
      },
      {
        title: "Regolamento Interno",
        text: "Il regolamento interno del Nido definisce l’organizzazione quotidiana, gli orari e le principali norme del servizio, garantendo ordine, sicurezza e collaborazione tra scuola e famiglie.",
        size: "422 KB",
      },
      {
        title: "Carta dei Servizi",
        text: "La Carta dei Servizi dell’Istituto Duchi Salviati presenta in modo chiaro i principi, l’organizzazione e i servizi offerti dalla scuola, garantendo trasparenza e un punto di riferimento per le famiglie.",
        size: "536 KB",
      },
      {
        title: "Progetto Pedagogico",
        text: "Il Progetto Pedagogico del Nido d’Infanzia „Le Ali del Paradiso“ descrive i valori, gli obiettivi e le modalità educative che guidano il nostro lavoro quotidiano. È un documento che racconta il nostro impegno nel garantire un ambiente sicuro, accogliente e attento allo sviluppo armonico di ogni bambino.",
        size: "272 KB",
      },
      {
        title: "Progetto Educativo",
        text: "La Programmazione Educativa della Scuola dell’Infanzia definisce il percorso annuale con obiettivi e attività pensati per accompagnare la crescita dei bambini. Attraverso esperienze ludiche e creative, la scuola promuove lo sviluppo armonico delle competenze cognitive, emotive e sociali in un ambiente sereno e stimolante.",
        size: "1.3 MB",
      },
    ],
  },
  {
    id: "infanzia",
    label: "Scuola dell’Infanzia",
    titleLead: "Scuola dell’Infanzia –",
    titleStrong: "Principessa Adele Borghese",
    icon: Palette,
    accent: "blue",
    items: [
      {
        title: "Modulo di Iscrizione alla Scuola dell’Infanzia",
        text: "Scarica il modulo di iscrizione alla Scuola dell’Infanzia e compilalo per avviare la procedura di ammissione del tuo bambino.",
        size: "681 KB",
      },
      {
        title: "Piano dell’Offerta Formativa",
        text: "Il PTOF (Piano Triennale dell’Offerta Formativa) descrive l’identità educativa e organizzativa dell’Istituto Duchi Salviati. Definisce i valori, gli obiettivi e le attività che guidano il nostro percorso scolastico, garantendo una formazione completa, coerente e attenta alla crescita di ogni bambino.",
        size: "1.1 MB",
      },
      {
        title: "Regolamento Interno",
        text: "Il Regolamento interno della Scuola dell’Infanzia definisce l’organizzazione quotidiana, le modalità di frequenza e le principali regole del servizio. È uno strumento importante per garantire un ambiente sicuro, ordinato e una collaborazione efficace tra scuola e famiglia.",
        size: "246 KB",
      },
      {
        title: "Carta dei Servizi",
        text: "La Carta dei Servizi dell’Istituto Duchi Salviati definisce in modo chiaro i principi, l’organizzazione e gli standard qualitativi della scuola. È uno strumento fondamentale che garantisce trasparenza, informazione alle famiglie e un impegno costante nel miglioramento del servizio educativo offerto.",
        size: "89 KB",
      },
      {
        title: "Regolamento Organizzativo",
        text: "Il Regolamento Organizzativo della Scuola dell’Infanzia definisce le modalità di funzionamento quotidiano del servizio, stabilendo tempi, procedure e regole che garantiscono un ambiente ordinato, sicuro e attento ai bisogni dei bambini. È uno strumento importante per favorire una collaborazione chiara ed efficace tra scuola e famiglie.",
        size: "728 KB",
      },
    ],
  },
  {
    id: "primaria",
    label: "Scuola Primaria",
    titleLead: "Scuola Primaria –",
    titleStrong: "Duchi Salviati",
    icon: BookOpen,
    accent: "green",
    items: [
      {
        title: "Modulo di Iscrizione alla Scuola Primaria",
        text: "Scarica il modulo di iscrizione alla Scuola Primaria e compilalo per avviare la procedura di ammissione del tuo bambino.",
        size: "681 KB",
      },
      {
        title: "Piano Offerta Formativa",
        text: "Il PTOF della Scuola Primaria dell’Istituto Duchi Salviati definisce l’identità educativa e le linee guida del nostro percorso formativo. Descrive obiettivi, attività e strategie didattiche pensate per accompagnare gli alunni dalla prima alla quinta classe, promuovendo una crescita armoniosa, inclusiva e attenta alle esigenze di ogni bambino.",
        size: "1.1 MB",
      },
      {
        title: "Progetto Continuità",
        text: "Il Progetto Continuità accompagna i bambini nel delicato passaggio dalla Scuola dell’Infanzia alla Scuola Primaria, creando un percorso sereno, graduale e ricco di esperienze condivise. Attraverso attività comuni, momenti di incontro e scoperta dei nuovi ambienti, la scuola favorisce sicurezza, fiducia e continuità educativa.",
        size: "228 KB",
      },
      {
        title: "RAV",
        size: "228 KB",
      },
      {
        title: "Progetto di Plesso",
        text: "Il Progetto di Plesso dell’anno scolastico definisce le attività condivise tra le diverse sezioni dell’Istituto Duchi Salviati, promuovendo collaborazione, continuità e partecipazione. Attraverso iniziative comuni e percorsi educativi trasversali, la scuola rafforza il senso di comunità e valorizza la crescita armonica di tutti i bambini.",
        size: "225 KB",
      },
    ],
  },
];
