import { ArrowRight, Mail, MessagesSquare } from "lucide-react";

import { ServicesTabs } from "@/components/scuola/ServicesTabs";
import { BrandButton } from "@/components/ui/BrandButton";
import { Bubble } from "@/components/ui/Bubble";

/* === Intro: Was die Schule bietet ====================================== */
const introFeatures: { title: string; text: string; note?: string }[] = [
  {
    title: "Un percorso educativo continuo e completo",
    text: "Offriamo un percorso completo e continuo, dal Nido alla Scuola Primaria, che accompagna ogni fase dello sviluppo con attenzione e coerenza educativa. La continuità tra i diversi livelli scolastici permette ai bambini di crescere in un ambiente familiare, stabile e ricco di stimoli.",
  },
  {
    title: "Scuola a tempo pieno e in più prima e dopo scuola",
    text: "La nostra scuola offre un servizio a tempo pieno con accoglienza prima e dopo le attività didattiche, garantendo ai bambini un ambiente sicuro, organizzato e sereno per tutta la giornata e supportando al contempo le esigenze delle famiglie.",
    note: "* Scuola finisce 17.06 ma bimbi rimangono all fino mese",
  },
  {
    title: "Bilinguismo: inglese e spagnolo",
    text: "La scuola promuove il bilinguismo con l’insegnamento di inglese e spagnolo, offrendo ai bambini un primo approccio alle lingue straniere in modo naturale e coinvolgente fin dai primi anni.",
  },
  {
    title: "Progetti scolastici",
    text: "La scuola propone diversi progetti educativi dedicati a temi importanti come la celiachia, l’educazione elementare, il progetto antibullismo e il teatro, con l’obiettivo di arricchire il percorso formativo dei bambini e promuovere valori di consapevolezza, rispetto e creatività.",
  },
  {
    title: "Campi solari",
    text: "Durante il periodo estivo la scuola organizza i campi solari, offrendo ai bambini attività ludiche, creative e all’aria aperta in un ambiente sicuro e stimolante, con continuità educativa anche durante le vacanze.",
  },
  {
    title: "DidUp",
    text: "La scuola utilizza DidUp come piattaforma digitale per la comunicazione con le famiglie, permettendo un accesso semplice e diretto a informazioni, avvisi e aggiornamenti scolastici in tempo reale.",
  },
];

/* === Perché conviene iscriversi ======================================== */
const perchePrimary = {
  title: "Un investimento nella crescita dei bambini",
  paragraphs: [
    "La scuola paritaria comporta un costo, ma questo viene ammortizzato dai numerosi servizi offerti e dal suo valore educativo e culturale.",
    "Scegliere la nostra scuola significa investire in un percorso formativo completo, che unisce qualità dell’insegnamento, attenzione alla persona e un’ampia gamma di servizi pensati per il benessere dei bambini e il supporto alle famiglie.",
    "È previsto uno sconto del 10% per il secondo figlio.",
  ],
};

const percheBlocks: { title: string; text: string }[] = [
  {
    title: "Cura, servizi e comunità educativa",
    text: "Grazie a servizi dedicati, insegnanti qualificati e un forte senso di comunità, garantiamo ai bambini le migliori condizioni per imparare, crescere e sentirsi a casa. La collaborazione tra scuola e famiglia rappresenta un valore fondamentale per accompagnare ogni bambino nel suo percorso di crescita.",
  },
  {
    title: "Una mensa interna con cucina fresca e tradizione",
    text: "La nostra mensa offre ogni giorno pasti preparati con prodotti a km zero, cucinati freschi da oltre 20 anni. Un servizio attento alla qualità, alla tradizione e al benessere dei bambini, con una cucina che da oltre 20 anni prepara pasti freschi ogni giorno.",
  },
];

/* === Voci dei bimbi della scuola ======================================= */
const testimonials: { quote: string; author: string }[] = [
  {
    quote:
      "Mi piace venire a scuola perché ogni giorno posso imparare cose nuove, giocare con i miei amici e stare con maestre che mi aiutano sempre.",
    author: "Matteo, alunno della terza classe",
  },
  {
    quote:
      "“Ogni giorno imparo qualcosa di nuovo e mi piace giocare con tutti i miei amici.”",
    author: "Sofia, bambina della scuola dell’infanzia",
  },
  {
    quote:
      "“La mia materia preferita è inglese e mi piace quando facciamo i lavori insieme in classe.”",
    author: "Leonardo, alunno della seconda classe",
  },
  {
    quote:
      "“A scuola mi sento bene perché le maestre ci aiutano sempre e ci divertiamo tanto.”",
    author: "Giulia, alunna della quarta classe",
  },
  {
    quote:
      "“A scuola mi sento felice perché ogni giorno imparo cose nuove e gioco con i miei amici.”",
    author: "Giulia, alunna della scuola primaria",
  },
  {
    quote:
      "“Mi piace stare qui perché giochiamo, cantiamo e facciamo tante cose belle insieme.”",
    author: "Tommaso, bambino del Nido",
  },
];

const ScuolaPage = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* === Intro =================================================== */}
        <section>
          <header className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
              La Scuola
            </h1>
            <p className="mt-4 text-lg font-medium text-black/80 lg:text-xl">
              Ciò che la nostra scuola offre ai bambini.
            </p>
          </header>

          <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-2">
            {/* Bild-Cluster (Platzhalter) */}
            <div className="relative mx-auto aspect-[638/803] w-full max-w-sm lg:max-w-md">
              <Bubble
                src="/images/scuola/intro-1.jpg"
                className="absolute top-[7%] left-0 aspect-square w-[63%] bg-light-blue"
              />
              <Bubble
                src="/images/scuola/intro-2.jpg"
                className="absolute top-[37%] left-[41%] aspect-square w-[58%] bg-green/30"
              />
              <Bubble
                src="/images/scuola/intro-3.jpg"
                className="absolute top-[59%] left-[2%] aspect-square w-[50%] bg-ocker/50"
              />
              <Bubble
                src="/images/scuola/intro-4.jpg"
                className="absolute top-[85%] left-[27%] aspect-square w-[49%] bg-light-rose"
              />
            </div>

            {/* Feature-Karte */}
            <div className="flex flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sm:p-10">
              {introFeatures.map((feature, i) => (
                <div key={feature.title}>
                  {i > 0 && <hr className="mb-6 border-light-beige-200" />}
                  <h3 className="text-lg leading-[1.4] font-semibold text-black">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.4] text-black">
                    {feature.text}
                  </p>
                  {feature.note && (
                    <p className="mt-2 text-base leading-[1.4] font-semibold text-black">
                      {feature.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === I nostri servizi (interaktive Reiter) =================== */}
        <ServicesTabs />

        {/* === Perché conviene iscriversi ============================== */}
        <section className="mt-20 lg:mt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Persönliche Notiz */}
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
                Perché conviene iscriversi?
              </h2>
              <Bubble
                src="/images/scuola/perche-video.jpg"
                className="size-[170px]"
              />
              <p className="max-w-[12rem] text-base leading-[1.4] text-black">
                Suor Blanca, Direttrice della scuola
              </p>
            </div>

            {/* Textspalten */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-black">
                  {perchePrimary.title}
                </h3>
                <div className="flex flex-col gap-4">
                  {perchePrimary.paragraphs.map((p) => (
                    <p key={p} className="text-base leading-[1.4] text-black">
                      {p}
                    </p>
                  ))}
                </div>
                <BrandButton
                  href="/contatti"
                  variant="outline"
                  size="md"
                  iconRight={ArrowRight}
                  className="mt-2 self-start"
                >
                  Richiedi informazioni sui costi
                </BrandButton>
              </div>

              {percheBlocks.map((block) => (
                <div key={block.title}>
                  <hr className="mb-8 border-light-beige-200" />
                  <h3 className="text-xl font-semibold tracking-tight text-black">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.4] text-black">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Voci dei bimbi della scuola ============================= */}
        <section className="mt-20 lg:mt-28">
          <div className="flex items-center gap-3 text-navy">
            <MessagesSquare className="size-10 shrink-0" strokeWidth={1.25} aria-hidden />
            <h2 className="text-3xl font-semibold tracking-tight">
              Voci dei bimbi della scuola
            </h2>
          </div>

          <div className="mt-6 rounded-[24px] bg-light-beige-200 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="flex flex-col gap-3 rounded-[24px] rounded-tl-[4px] bg-white px-6 py-5"
                >
                  <blockquote className="text-lg leading-[1.4] font-semibold text-black">
                    {t.quote}
                  </blockquote>
                  <div className="h-0.5 w-16 rounded-full bg-light-beige" />
                  <figcaption className="text-lg leading-[1.4] text-black">
                    {t.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* === Teaser / CTA =========================================== */}
        <section className="mt-20 lg:mt-28">
          <div className="rounded-[20px] bg-light-grey p-4 sm:p-8">
            <div className="flex flex-col gap-6 rounded-[16px] bg-white p-8 sm:p-14 lg:flex-row lg:gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-semibold tracking-tight text-black">
                  Hai domande o qualcosa non ti è ancora chiaro?
                </h2>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-8">
                <p className="text-base leading-[1.4] text-black">
                  Siamo sempre a disposizione per rispondere alle vostre domande e
                  fornire tutte le informazioni necessarie. Non esitate a
                  contattarci per qualsiasi dubbio: il nostro team sarà lieto di
                  aiutarvi e accompagnarvi nella scelta del percorso educativo più
                  adatto al vostro bambino.
                </p>
                <div className="flex flex-wrap gap-6">
                  <BrandButton href="/contatti" variant="solid" color="goldbrown">
                    Vai alla pagina dei contatti
                  </BrandButton>
                  <BrandButton
                    href="/contatti"
                    variant="outline"
                    iconLeft={Mail}
                  >
                    Scrivici
                  </BrandButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ScuolaPage;
