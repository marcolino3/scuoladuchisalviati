import Image from "next/image";
import {
  ArrowRight,
  Baby,
  BookOpen,
  CircleCheck,
  MessagesSquare,
  Palette,
  type LucideIcon,
} from "lucide-react";

import { DayGallery } from "@/components/home/DayGallery";
import { CtaTeaser } from "@/components/site/CtaTeaser";
import { Accordion, type FaqItem } from "@/components/ui/Accordion";
import { BrandButton } from "@/components/ui/BrandButton";
import { Bubble } from "@/components/ui/Bubble";

const introChecklist = [
  "Nido, Scuola dell’Infanzia e Scuola Primaria",
  "Scuola a tempo pieno",
  "Prima e dopo scuola",
  "Servizio di mensa interna",
  "Uscite didattice",
  "Campi solari",
];

type Accent = "rosa" | "blue" | "green";
const cardAccent: Record<Accent, { ring: string; iconBg: string; icon: string }> = {
  rosa: { ring: "ring-rosa/25", iconBg: "bg-rosa/10", icon: "text-rosa" },
  blue: { ring: "ring-blue/25", iconBg: "bg-blue/10", icon: "text-blue" },
  green: { ring: "ring-green/25", iconBg: "bg-green/10", icon: "text-green" },
};

const scuolaCards: {
  accent: Accent;
  icon: LucideIcon;
  titleLead: string;
  titleStrong: string;
  text: string;
  button: string;
  image: string;
}[] = [
  {
    accent: "rosa",
    icon: Baby,
    titleLead: "Nido d’Infanzia –",
    titleStrong: "Le Ali del Paradiso",
    text: "Un ambiente accogliente e sicuro dove i bambini dai 18 mesi iniziano il loro percorso di crescita. Il Nido favorisce le prime relazioni, l’autonomia e lo sviluppo emotivo attraverso gioco e cura quotidiana, in un contesto familiare e attento ai bisogni di ogni bambino.",
    button: "Scopri il Nido",
    image: "/images/home/lascuola-nido.jpg",
  },
  {
    accent: "blue",
    icon: Palette,
    titleLead: "Scuola dell’Infanzia –",
    titleStrong: "Principessa Adele Borghese",
    text: "Un percorso educativo che accompagna i bambini nella scoperta di sé e del mondo. Attraverso attività creative, esperienze di gruppo e apprendimento ludico, la Scuola dell’Infanzia promuove curiosità, socializzazione e sviluppo armonico della personalità.",
    button: "Scopri l’Infanzia",
    image: "/images/home/lascuola-infanzia.jpg",
  },
  {
    accent: "green",
    icon: BookOpen,
    titleLead: "Scuola Primaria –",
    titleStrong: "Duchi Salviati",
    text: "Un ambiente scolastico completo e strutturato che guida i bambini dalla prima alla quinta classe. La Scuola Primaria unisce formazione didattica, attenzione individuale e crescita personale, con insegnamenti di base e lingue straniere in un contesto sereno e continuativo.",
    button: "Scopri la Primaria",
    image: "/images/home/lascuola-primaria.jpg",
  },
];

const chiSiamoBlocks = [
  {
    title: "Una comunità educativa guidata dalla cura e dall’accoglienza",
    text: "L’Istituto Duchi Salviati è una comunità educativa accogliente, guidata da una forte attenzione alla cura e alla crescita dei bambini. La direzione e l’assistenza prima e dopo le attività scolastiche sono affidate a tre religiose, con Suor Blanca come responsabile, che accompagnano quotidianamente i bambini con presenza, dedizione e spirito di famiglia.",
  },
  {
    title: "Un percorso scolastico completo dalla prima alla quinta classe",
    text: "Dalla prima alla quinta classe, il percorso scolastico è seguito da un team di insegnanti qualificati che accompagnano gli alunni nello sviluppo delle competenze di base e nella crescita personale. L’offerta formativa include anche l’insegnamento delle lingue straniere, come inglese e spagnolo, per arricchire il percorso educativo.",
  },
  {
    title: "Cura quotidiana degli ambienti e benessere dei bambini",
    text: "A completare la nostra realtà, un personale attento si occupa con cura della cucina e della pulizia degli ambienti, garantendo ogni giorno un ambiente sicuro, ordinato e accogliente per tutti i bambini.",
  },
];

const testimonials = [
  {
    quote:
      "“Vedo ogni mattino al ingresso della scuola Suor Blanca che saluta e abbraccia ogni bambino che entra.”",
    author: "Andrea, babbo di due bambini della prima classe",
  },
  {
    quote:
      "È una scuola privata, quindi si paga una retta, ma se penso a tutto ciò che offre — tempo pieno, mensa e assistenza — e al fatto che altrimenti dovrei pagare un babysitter ogni giorno per poter lavorare, il costo è davvero contenuto.",
    author: "Elena, mamma di un alunno della terza classe",
  },
  {
    quote:
      "“Abbiamo trovato una scuola accogliente e familiare, dove nostra figlia viene seguita con attenzione ogni giorno.”",
    author: "Martina, mamma di una bambina della scuola primaria",
  },
  {
    quote: "“Non vedo l’ora di andare a scuola ogni giorno.”",
    author: "Keira, alunna della terza classe",
  },
  {
    quote: "“Mi piace tanto giocare con i miei amici e fare i disegni con le maestre.”",
    author: "Sofia, bambina della scuola dell’infanzia",
  },
  {
    quote: "“I miei bambini adorano il cibo, soprattutto le carote e i piselli :)”",
    author: "Simona, mamma di due bambini della scuola dell’infanzia",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Quanto costa la scuola?",
    answer:
      "La nostra è una scuola paritaria. È previsto uno sconto del 10% per il secondo figlio — per un preventivo dettagliato contattaci.",
  },
  {
    question: "Quali sono gli orari di accoglienza?",
    answer:
      "Offriamo il tempo pieno con accoglienza prima e dopo le attività didattiche. Tutti gli orari sono indicati nella pagina Modulistica & FAQ.",
  },
  {
    question: "Come funziona l’iscrizione?",
    answer:
      "Scarica il modulo d’iscrizione dalla pagina del livello scolastico desiderato e contattaci per ogni informazione.",
  },
];

export default function HomePage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* === Intro =================================================== */}
        <section>
          <header className="text-center">
            <p className="text-lg text-black/70 lg:text-2xl">
              Casa di Procura Missionaria
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black lg:text-[3.875rem] lg:leading-[1.1]">
              Instituto Paritario Duchi Salviati
            </h1>
          </header>

          <div className="mt-12 rounded-[24px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sm:p-10 lg:mt-16">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Text */}
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
                  Benvenuti nella nostra scuola
                </h2>
                <p className="mt-4 text-base leading-[1.4] text-black">
                  All’Istituto Duchi Salviati accompagniamo la crescita dei più
                  piccoli in un ambiente sereno e familiare, dove imparare
                  significa esplorare, scoprire e crescere insieme.
                </p>
                <p className="mt-3 text-base leading-[1.4] text-black">
                  Lo{" "}
                  <span className="font-semibold">
                    stile educativo dell’Istituto Duchi Salviati
                  </span>{" "}
                  si basa su un approccio attento, familiare e continuo che
                  accompagna ogni bambino nella sua crescita personale, emotiva e
                  didattica, valorizzando rispetto, cura e collaborazione.
                </p>
                <p className="mt-4 text-base leading-[1.4] font-semibold text-black">
                  Offriamo un percorso educativo completo che comprende:
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {introChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CircleCheck
                        className="size-4 shrink-0 text-success"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="text-base leading-[1.4] text-black">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <BrandButton href="/scuola" variant="solid" color="goldbrown">
                    Scopri di più
                  </BrandButton>
                  <BrandButton href="/contatti" variant="outline">
                    Contattaci
                  </BrandButton>
                </div>
              </div>

              {/* Bild-Cluster (Platzhalter) */}
              <div className="relative mx-auto aspect-[558/700] w-full max-w-sm">
                <Bubble
                  src="/images/home/intro-1.jpg"
                  className="absolute top-[1%] left-[7%] aspect-square w-[57%] bg-light-blue"
                />
                <Bubble
                  src="/images/home/intro-2.jpg"
                  className="absolute top-[29%] left-[44%] aspect-square w-[58%] bg-ocker/50"
                />
                <Bubble
                  src="/images/home/intro-3.jpg"
                  className="absolute top-[50%] left-[2%] aspect-square w-[64%] bg-green/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* === Zitat ================================================== */}
        <section className="relative mt-20 lg:mt-28">
          <span
            aria-hidden
            className="absolute top-0 left-0 font-serif text-[7rem] font-bold leading-[0.8] text-goldbrown sm:text-[10rem] lg:text-[14rem]"
          >
            &ldquo;
          </span>
          <blockquote className="px-2 pt-14 text-center font-serif text-2xl leading-[1.15] font-semibold text-goldbrown sm:px-12 sm:text-3xl lg:px-20 lg:pt-24 lg:text-[2.75rem]">
            »Una scuola che permette ai genitori di lavorare, guidata da persone
            di cui ci si può fidare, che trasmette valori in un clima di
            famiglia.«
          </blockquote>
          <div className="mx-auto mt-8 h-0.5 w-16 rounded-full bg-light-beige" />
          <p className="mt-6 text-center text-base text-black">
            Vincenzo, babbo di due bambini della prima classe
          </p>
        </section>

        {/* === La Scuola (3 Karten) =================================== */}
        <section className="mt-20 lg:mt-28">
          <header className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
              La Scuola
            </h2>
            <p className="mt-4 text-lg text-black/80">
              Dal Nido alla Primaria: scuola, mensa e tempo pieno per crescere
              insieme
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {scuolaCards.map((card) => {
              const Icon = card.icon;
              const accent = cardAccent[card.accent];
              return (
                <article
                  key={card.titleStrong}
                  className={`flex flex-col rounded-[20px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ${accent.ring}`}
                >
                  <span
                    className={`grid size-14 place-items-center rounded-full ${accent.iconBg} ${accent.icon}`}
                  >
                    <Icon className="size-7" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl leading-[1.2] tracking-tight text-navy">
                    {card.titleLead}
                    <br />
                    <span className="font-semibold">{card.titleStrong}</span>
                  </h3>
                  <div className="relative mt-4 aspect-[355/280] overflow-hidden rounded-2xl">
                    <Image
                      src={card.image}
                      alt=""
                      width={355}
                      height={280}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-1/2 to-black/30" />
                  </div>
                  <p className="mt-4 flex-1 text-base leading-[1.4] text-black">
                    {card.text}
                  </p>
                  <BrandButton
                    href="/scuola"
                    variant="outline"
                    iconRight={ArrowRight}
                    className="mt-6 self-start"
                  >
                    {card.button}
                  </BrandButton>
                </article>
              );
            })}
          </div>
        </section>

        {/* === Video ================================================== */}
        <section className="mt-20 lg:mt-28">
          <DayGallery />
          <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-12">
            <h2 className="text-2xl font-semibold tracking-tight text-black lg:text-3xl">
              La nostra scuola in un giorno
            </h2>
            <p className="text-base leading-[1.4] text-black">
              Un breve sguardo alla vita quotidiana dell’Istituto Duchi Salviati,
              dove i bambini crescono, imparano e vivono ogni giorno esperienze in
              un ambiente sereno, accogliente e ricco di stimoli.
            </p>
          </div>
        </section>

        {/* === Chi siamo (Teaser) ===================================== */}
        <section className="mt-20 lg:mt-28">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
                Chi siamo
              </h2>
              <Bubble src="/images/chi-siamo/drop-1.jpg" className="size-64" />
              <p className="max-w-[16rem] text-base leading-[1.4] text-black">
                Suor Blanca e insegnanti della scuola
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {chiSiamoBlocks.map((block, i) => (
                <div key={block.title}>
                  {i > 0 && <hr className="mb-8 border-light-beige-200" />}
                  <h3 className="text-xl font-semibold tracking-tight text-navy">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.4] text-black">
                    {block.text}
                  </p>
                </div>
              ))}
              <BrandButton
                href="/chi-siamo"
                variant="outline"
                iconRight={ArrowRight}
                className="self-start"
              >
                Scopri chi siamo
              </BrandButton>
            </div>
          </div>
        </section>

        {/* === Voci dalla scuola ====================================== */}
        <section className="mt-20 lg:mt-28">
          <div className="flex items-center gap-3 text-navy">
            <MessagesSquare className="size-10 shrink-0" strokeWidth={1.25} aria-hidden />
            <h2 className="text-3xl font-semibold tracking-tight">
              Voci dalla scuola
            </h2>
          </div>

          <div className="mt-6 rounded-[24px] bg-light-beige-200 p-6 sm:p-8">
            {/* Statistik */}
            <div className="flex flex-col items-center gap-5 rounded-[16px] bg-white px-6 py-6 text-center sm:flex-row sm:text-left">
              <span className="grid size-28 shrink-0 place-items-center rounded-full border-[6px] border-green/30 text-3xl font-bold text-navy">
                97%
              </span>
              <p className="text-lg leading-[1.4] text-black">
                dei genitori è soddisfatto della scuola e non sceglierebbe di
                cambiarla.
              </p>
            </div>

            {/* Stimmen */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="flex flex-col gap-3 rounded-[24px] rounded-tl-[4px] bg-white px-6 py-5"
                >
                  <blockquote className="text-lg leading-[1.4] font-semibold text-black">
                    {t.quote}
                  </blockquote>
                  <div className="h-0.5 w-16 rounded-full bg-light-beige" />
                  <figcaption className="text-base leading-[1.4] text-black">
                    {t.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* === News & Storia (Teaser) ================================ */}
        <section className="mt-20 lg:mt-28">
          <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
            News &amp; Storia
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="aspect-[357/532] overflow-hidden rounded-[20px]">
              <Image
                src="/images/home/news-1.png"
                alt=""
                width={357}
                height={532}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 rounded-[20px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:flex-row">
              <div className="aspect-square shrink-0 overflow-hidden rounded-[16px] sm:w-2/5">
                <Image
                  src="/images/home/news-2.png"
                  alt=""
                  width={500}
                  height={500}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-2 sm:p-4">
                <h3 className="text-2xl font-semibold tracking-tight text-navy">
                  Una storia di educazione e crescita
                </h3>
                <p className="text-base leading-[1.4] text-black">
                  Da generazioni l’Istituto Duchi Salviati accompagna bambini e
                  famiglie con passione, dedizione e attenzione alla persona.
                  Scopri le origini della nostra scuola e i valori che ancora oggi
                  guidano il nostro percorso educativo.
                </p>
                <BrandButton
                  href="/news-storia"
                  variant="outline"
                  iconRight={ArrowRight}
                  className="mt-2 self-start"
                >
                  News &amp; Storia
                </BrandButton>
              </div>
            </div>
          </div>
        </section>

        {/* === Modulistica & FAQ (Teaser) ============================ */}
        <section className="mt-20 lg:mt-28">
          <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
            Modulistica &amp; FAQ
          </h2>
          <Accordion items={faqItems} className="mt-8" />
          <BrandButton
            href="/modulistica-faq"
            variant="outline"
            iconRight={ArrowRight}
            className="mt-6"
          >
            Modulistica e FAQ
          </BrandButton>
        </section>

        {/* === CTA-Teaser ============================================ */}
        <CtaTeaser />
      </div>
    </main>
  );
}
