import Image from "next/image";
import { Fragment } from "react";
import { HandHeart } from "lucide-react";

import { CtaTeaser } from "@/components/site/CtaTeaser";
import { Bubble } from "@/components/ui/Bubble";

/* === Intro: Mission & Gemeinschaft ===================================== */
const introBlocks: { title?: string; text: string; lead?: boolean }[] = [
  {
    lead: true,
    text: "L’Istituto Duchi Salviati è una scuola paritaria che accoglie bambini dal Nido alla Scuola Primaria. Ogni giorno lavoriamo per offrire un ambiente sereno, familiare e stimolante, in cui ogni bambino possa crescere, imparare e sviluppare il proprio potenziale.",
  },
  {
    title: "La nostra missione",
    text: "L’Istituto Duchi Salviati è una scuola paritaria che accoglie bambini dal Nido alla Scuola Primaria. Ogni giorno lavoriamo per offrire un ambiente sereno, familiare e stimolante, in cui ogni bambino possa crescere, imparare e sviluppare il proprio potenziale.",
  },
  {
    title: "Una comunità educativa",
    text: "L’Istituto è guidato da una comunità educativa composta da religiose, insegnanti e personale scolastico che collaborano ogni giorno per garantire il benessere dei bambini e sostenere le famiglie nel loro percorso educativo.",
  },
];

/* === Team ============================================================== */
type Member = { photo: string; name: string; role: string; imgClassName?: string };

const direttrice: Member = {
  photo: "/images/chi-siamo/team-suor-blanca.jpg",
  name: "Suor Blanca",
  role: "Direttrice dell’Istituto",
  imgClassName: "object-[38%_55%]",
};

const insegnantiInfanzia: Member[] = [
  {
    photo: "/images/chi-siamo/team-silvia.jpg",
    name: "Silvia",
    role: "Insegnante dell’Infanzia",
    imgClassName: "object-[center_28%]",
  },
  {
    photo: "/images/chi-siamo/team-valentina.jpg",
    name: "Valentina",
    role: "Insegnante dell’Infanzia",
    imgClassName: "object-[62%_28%]",
  },
];

const educatriciNido: Member[] = [
  {
    photo: "/images/chi-siamo/team-annamaria.jpg",
    name: "Anna Maria Cicciarello",
    role: "Educatrice del Nido",
    imgClassName: "object-[center_35%]",
  },
  {
    photo: "/images/chi-siamo/team-sandra.jpg",
    name: "Sandra Cecchini",
    role: "Educatrice del Nido",
    imgClassName: "object-[center_12%]",
  },
];

const personaleCucina: Member[] = [
  {
    photo: "/images/chi-siamo/team-antonella.jpg",
    name: "Antonella Bianchini",
    role: "Cuoca",
    imgClassName: "object-[center_30%]",
  },
  {
    photo: "/images/chi-siamo/team-daniela.jpg",
    name: "Daniela Trogi",
    role: "Addetta alle pulizie",
    imgClassName: "object-[center_35%]",
  },
];

/* === Werte ============================================================= */
const valori: { title: string; text: string }[] = [
  {
    title: "Accoglienza",
    text: "Ogni bambino è accolto con attenzione e rispetto.",
  },
  {
    title: "Continuità educativa",
    text: "Un percorso unico dal Nido alla Primaria.",
  },
  {
    title: "Collaborazione con le famiglie",
    text: "Scuola e famiglia crescono insieme.",
  },
  {
    title: "Crescita della persona",
    text: "Non solo apprendimento, ma sviluppo umano e relazionale.",
  },
];

const istitutoInBreve: string[] = [
  "Nido accreditato",
  "Scuola dell’Infanzia",
  "Scuola Primaria fino alla quinta",
  "Tempo pieno",
  "Inglese e spagnolo",
  "Mensa interna con prodotti a km zero",
  "Campi solari",
  "DidUp per la comunicazione con le famiglie",
];

/* === Team-Bausteine ==================================================== */
const TeamMember = ({ photo, name, role, imgClassName }: Member) => (
  <figure className="flex w-40 flex-col items-center gap-3 sm:w-52 lg:w-60">
    <Bubble
      src={photo}
      alt={name}
      className="size-40 sm:size-52 lg:size-60"
      imgClassName={imgClassName}
    />
    <figcaption className="text-center">
      <p className="text-base leading-[1.4] font-semibold text-black">{name}</p>
      <p className="text-base leading-[1.4] text-black">{role}</p>
    </figcaption>
  </figure>
);

const TeamGroup = ({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-6">
    <h3 className="text-center text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
      {title}
    </h3>
    {children}
    <p className="mx-auto max-w-3xl text-center text-base leading-[1.4] text-navy">
      {caption}
    </p>
  </div>
);

const ChiSiamoPage = () => {
  return (
    <main className="relative overflow-x-clip">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* === Intro =================================================== */}
        <section>
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
              Chi siamo
            </h1>
            <p className="mt-4 text-2xl leading-[1.1] font-semibold tracking-tight text-navy lg:text-[2rem]">
              Da generazioni al fianco delle famiglie per educare, accogliere e
              far crescere ogni bambino.
            </p>
          </header>

          <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2">
            <div className="flex justify-center">
              <Bubble
                src="/images/chi-siamo/intro.jpg"
                className="size-72 sm:size-80 lg:size-[400px]"
                imgClassName="object-[center_40%]"
              />
            </div>

            <div className="flex flex-col gap-8 lg:pr-10">
              {introBlocks.map((block, i) => (
                <Fragment key={block.title ?? i}>
                  {i > 0 && <hr className="border-light-beige-200" />}
                  <div>
                    {block.title && (
                      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-black">
                        {block.title}
                      </h2>
                    )}
                    <p
                      className={
                        block.lead
                          ? "text-lg leading-[1.4] font-semibold text-black"
                          : "text-base leading-[1.4] text-black"
                      }
                    >
                      {block.text}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* === Team ==================================================== */}
        <section className="mt-20 lg:mt-28">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-black lg:text-5xl">
            Le persone che si prendono cura dei bambini
          </h2>

          <div className="mt-12 flex flex-col gap-16 lg:mt-16">
            {/* Direzione */}
            <TeamGroup
              title="Responsabile dell’Istituto"
              caption="Con dedizione, esperienza e spirito di servizio, Suor Blanca guida l’Istituto con attenzione e sensibilità. Accompagna ogni giorno bambini, famiglie e personale, promuovendo un ambiente educativo fondato su accoglienza, rispetto e crescita condivisa."
            >
              <TeamMember {...direttrice} />
            </TeamGroup>

            {/* Insegnanti della Primaria – Gruppenfoto */}
            <TeamGroup
              title="Insegnanti della Primaria"
              caption="Con competenza, passione e attenzione accompagnano gli alunni nello sviluppo delle conoscenze, dell’autonomia e del senso di responsabilità. Ogni giorno promuovono un apprendimento coinvolgente, valorizzando le potenzialità di ciascun bambino."
            >
              <div className="w-full lg:px-[120px]">
                <div className="relative aspect-[1016/417] w-full overflow-hidden rounded-[24px] bg-light-beige-200">
                  <Image
                    src="/images/chi-siamo/primaria-gruppo.jpg"
                    alt="Le insegnanti e gli alunni della Scuola Primaria"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1016px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                </div>
              </div>
            </TeamGroup>

            {/* Insegnanti dell'Infanzia */}
            <TeamGroup
              title="Insegnanti dell’Infanzia"
              caption="Con entusiasmo, creatività e attenzione accompagnano i bambini nel loro percorso di crescita, valorizzando curiosità, autonomia e relazioni. Ogni giorno creano un ambiente sereno e stimolante, dove imparare diventa un’esperienza ricca di scoperte."
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
                {insegnantiInfanzia.map((m) => (
                  <TeamMember key={m.name} {...m} />
                ))}
              </div>
            </TeamGroup>

            {/* Educatrici del Nido */}
            <TeamGroup
              title="Educatrici del Nido"
              caption="Con passione e attenzione accompagnano i bambini nelle loro prime esperienze di crescita, creando ogni giorno un ambiente sereno, accogliente e stimolante, dove ogni piccolo può sentirsi al sicuro e valorizzato."
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
                {educatriciNido.map((m) => (
                  <TeamMember key={m.name} {...m} />
                ))}
              </div>
            </TeamGroup>

            {/* Personale di cucina e servizi */}
            <TeamGroup
              title="Personale di cucina e servizi"
              caption="Ogni giorno il personale di cucina e dei servizi contribuisce con cura e professionalità al benessere dei bambini, garantendo pasti genuini e ambienti sempre puliti, sicuri e accoglienti."
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
                {personaleCucina.map((m) => (
                  <TeamMember key={m.name} {...m} />
                ))}
              </div>
            </TeamGroup>
          </div>
        </section>

        {/* === I nostri valori ======================================== */}
        <section className="mt-20 lg:mt-28">
          <div className="flex items-center gap-3 text-navy">
            <HandHeart className="size-10 shrink-0" strokeWidth={1.25} aria-hidden />
            <h2 className="text-3xl font-semibold tracking-tight">
              I nostri valori
            </h2>
          </div>

          <div className="mt-6 rounded-[32px] border border-light-blue p-2 sm:p-3">
            <div className="rounded-[24px] bg-light-beige-50 p-6 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Ci guida ogni giorno */}
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                    Ci guida ogni giorno
                  </h3>
                  <div className="flex flex-col gap-6">
                    {valori.map((v) => (
                      <div key={v.title}>
                        <p className="text-lg leading-[1.4] font-semibold text-black">
                          {v.title}
                        </p>
                        <p className="text-base leading-[1.4] text-black">
                          {v.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* L'Istituto in breve */}
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                    L’Istituto in breve
                  </h3>
                  <ul className="flex list-disc flex-col gap-2 pl-6 text-lg leading-[1.6] font-semibold text-black marker:text-black">
                    {istitutoInBreve.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Zitat ================================================== */}
        <section className="relative mt-20 lg:mt-28">
          <span
            aria-hidden
            className="absolute top-0 left-0 font-serif text-[7rem] leading-[0.8] font-bold text-goldbrown sm:text-[10rem] lg:text-[14rem]"
          >
            &ldquo;
          </span>
          <blockquote className="px-2 pt-14 text-center font-serif text-2xl leading-[1.15] font-semibold text-goldbrown sm:px-12 sm:text-3xl lg:px-20 lg:pt-24 lg:text-[2.75rem]">
            »Considerando il tempo pieno, la mensa e il supporto offerto alle
            famiglie, la retta è davvero contenuta rispetto al valore ricevuto.«
          </blockquote>
          <div className="mx-auto mt-8 h-0.5 w-16 rounded-full bg-light-blue" />
          <p className="mt-6 text-center text-lg text-black">
            Elena, mamma di un alunno della terza classe
          </p>
        </section>

        {/* === Teaser / CTA =========================================== */}
        <CtaTeaser />
      </div>
    </main>
  );
};

export default ChiSiamoPage;
