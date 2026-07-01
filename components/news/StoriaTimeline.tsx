import { cn } from "@/lib/utils";

/* === Foto-Platzhalter (echte Bilder folgen später) ===================== */
const Frame = ({ className }: { className?: string }) => (
  <div className={cn("rounded-xl bg-light-beige-200", className)} aria-hidden />
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-[1.4] text-black/70">{children}</p>
);

const MediaSingle = ({ aspect }: { aspect: string }) => (
  <Frame className={cn("w-full", aspect)} />
);

const MediaPortraitPair = () => (
  <div className="grid grid-cols-2 gap-4">
    <Frame className="aspect-[412/510]" />
    <Frame className="aspect-[412/510]" />
  </div>
);

const MediaGrid = ({
  rows,
  caption,
}: {
  rows: string[][];
  caption?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    {rows.map((row, r) => (
      <div key={r} className="grid grid-cols-2 gap-4">
        {row.map((a, c) => (
          <Frame key={c} className={a} />
        ))}
      </div>
    ))}
    {caption && <Caption>{caption}</Caption>}
  </div>
);

/* === Datentyp ========================================================== */
type Card = {
  title: string;
  body: React.ReactNode;
  media?: React.ReactNode;
  mediaPosition?: "top" | "bottom";
};

type Entry = { year: string; side: "left" | "right"; cards: Card[] };

/* === Inhalt der Timeline =============================================== */
const entries: Entry[] = [
  {
    year: "1858",
    side: "right",
    cards: [
      {
        title: "Le origini di un’opera educativa e sociale",
        body: (
          <>
            <p>
              Il 18 dicembre 1858 il Duca Scipione Salviati e la Duchessa
              Arabella Salviati affidarono alle{" "}
              <strong>Figlie della Carità di San Vincenzo de’ Paoli</strong> una
              missione destinata a lasciare un segno profondo nella comunità di
              Migliarino.
            </p>
            <p>
              Ispirati dall’esempio delle opere assistenziali che la famiglia
              aveva conosciuto in Francia, i Duchi vollero creare un luogo in
              cui educazione, assistenza ai malati e sostegno ai più poveri
              fossero parte di un unico progetto di promozione umana e cristiana.
            </p>
          </>
        ),
        media: <MediaSingle aspect="aspect-[560/309]" />,
        mediaPosition: "bottom",
      },
    ],
  },
  {
    year: "1861",
    side: "left",
    cards: [
      {
        title: "L’arrivo delle suore e l’inizio delle attività",
        body: (
          <p>
            Con l’arrivo delle prime <strong>suore vincenziane</strong> prese
            concretamente avvio l’opera educativa e assistenziale. Le religiose
            si dedicarono alla cura dei malati, alle visite domiciliari delle
            famiglie bisognose e all’istruzione dei bambini della tenuta. Nello
            stesso anno venne aperto l’asilo infantile, seguito dalla scuola
            elementare, da una scuola di cucito e da un laboratorio di tessitura
            destinato alle ragazze.
          </p>
        ),
        media: <MediaSingle aspect="aspect-[472/236]" />,
        mediaPosition: "top",
      },
    ],
  },
  {
    year: "1876",
    side: "right",
    cards: [
      {
        title: "Una presenza stabile al servizio della comunità",
        body: (
          <p>
            Nel novembre del 1876 la famiglia Salviati concesse alle suore
            l’utilizzo stabile del complesso immobiliare che ospitava la scuola,
            l’asilo e la comunità religiosa. Questa scelta consolidò
            ulteriormente la presenza delle Vincenziane a Migliarino, rendendo
            l’istituto un punto di riferimento per la formazione e la vita
            sociale del territorio.
          </p>
        ),
        media: <MediaSingle aspect="aspect-[430/261]" />,
        mediaPosition: "top",
      },
    ],
  },
  {
    year: "I primi decenni del Novecento",
    side: "right",
    cards: [
      {
        title: "L’espansione della scuola nel nuovo secolo",
        body: (
          <p>
            Con l’inizio del nuovo secolo la scuola continuò a crescere. Il
            laboratorio di tessitura venne progressivamente dismesso, mentre la
            scuola elementare iniziò ad accogliere anche le bambine.
            Parallelamente aumentò il numero delle suore impegnate nell’opera
            educativa e il numero dei bambini che frequentavano l’istituto.
          </p>
        ),
      },
    ],
  },
  {
    year: "1908",
    side: "right",
    cards: [
      {
        title: "Cinquant’anni di servizio",
        body: (
          <p>
            Nel cinquantesimo anniversario della fondazione, l’opera dei Duchi
            Salviati mostrava tutta la sua vitalità. L’asilo ospitava circa 140
            bambini e la scuola elementare circa 90 alunni, affidati alle cure e
            all’insegnamento delle suore che continuavano a svolgere anche
            un’importante attività di assistenza alle famiglie del territorio.
          </p>
        ),
      },
    ],
  },
  {
    year: "1939–1945",
    side: "right",
    cards: [
      {
        title: "Gli anni della guerra",
        body: (
          <p>
            Durante la Seconda Guerra Mondiale le Figlie della Carità non
            interruppero mai il loro servizio. In un periodo segnato da
            difficoltà e privazioni, gli edifici della scuola furono utilizzati
            anche come rifugi, offrendo protezione e sostegno alla popolazione
            locale.
          </p>
        ),
      },
    ],
  },
  {
    year: "1952",
    side: "left",
    cards: [
      {
        title: "La donazione della famiglia Salviati",
        body: (
          <p>
            Il 27 settembre 1952 la generosità della famiglia Salviati si
            manifestò ancora una volta attraverso la donazione ufficiale
            dell’intero complesso alle Figlie della Carità. L’atto sancì
            definitivamente il legame tra la scuola e la sua missione educativa,
            prevedendo anche l’impegno costante verso le famiglie più bisognose.
          </p>
        ),
        media: <MediaSingle aspect="aspect-[378/198]" />,
        mediaPosition: "top",
      },
      {
        title: "Una scuola che è anche una casa",
        body: (
          <p>
            Per decenni la scuola rappresentò molto più di un semplice luogo di
            istruzione. Per generazioni di bambini e ragazzi della tenuta
            divenne una seconda casa, un luogo di incontro, di crescita e di
            formazione umana e spirituale. Le suore erano considerate parte
            integrante della comunità e accompagnavano i giovani non solo nello
            studio, ma anche nella vita quotidiana e nella preparazione ai
            principali momenti della vita cristiana.
          </p>
        ),
      },
    ],
  },
  {
    year: "1976–1977",
    side: "right",
    cards: [
      {
        title: "Il rinnovamento e la Parifica",
        body: (
          <p>
            Con l’arrivo di <strong>Suor Carla Montoncello</strong> alla
            direzione della scuola si aprì una fase di modernizzazione. Furono
            introdotte nuove modalità organizzative e didattiche, venne istituito
            il Consiglio d’Istituto e furono avviati importanti progetti di
            sviluppo. Nel 1977 la scuola raggiunse uno dei traguardi più
            significativi della sua storia ottenendo la Parifica, riconoscimento
            che ne consolidò il ruolo all’interno del sistema scolastico
            italiano.
          </p>
        ),
      },
    ],
  },
  {
    year: "Gli anni Ottanta",
    side: "right",
    cards: [
      {
        title: "Innovazione e apertura al territorio",
        body: (
          <p>
            Negli anni successivi furono realizzati importanti interventi di
            miglioramento delle strutture e dei servizi. Tra questi spiccò la
            ristrutturazione della cucina e l’introduzione di un servizio mensa
            completo. La scuola rafforzò inoltre la collaborazione con le
            istituzioni scolastiche e gli enti locali, diventando una realtà
            sempre più integrata nel territorio.
          </p>
        ),
      },
    ],
  },
  {
    year: "1997",
    side: "left",
    cards: [
      {
        title: "Un passaggio storico",
        body: (
          <p>
            Dopo quasi centoquarant’anni di presenza, le Figlie della Carità di
            San Vincenzo de’ Paoli lasciarono Migliarino a causa della
            diminuzione delle vocazioni religiose. Per la comunità scolastica si
            trattò di un momento delicato e carico di incertezza. Grazie
            all’impegno della famiglia Salviati, del Consiglio d’Istituto, della
            diocesi e di molte persone legate alla scuola, fu possibile trovare
            una nuova congregazione disposta a raccogliere questa importante
            eredità educativa.
          </p>
        ),
        media: (
          <MediaGrid
            rows={[
              ["aspect-[228/320]", "aspect-[228/320]"],
              ["aspect-[228/260]", "aspect-[228/260]"],
            ]}
            caption="Documenti ufficiali"
          />
        ),
        mediaPosition: "bottom",
      },
      {
        title: "L’arrivo delle Suore Francescane Missionarie dell’Immacolata",
        body: (
          <p>
            <strong>Il 5 maggio 1997</strong> le Suore Francescane Missionarie
            dell’Immacolata arrivarono a Migliarino accolte con entusiasmo da
            bambini, famiglie e personale scolastico. Provenienti da una
            congregazione fondata in Ecuador dalla Serva di Dio Maria Francesca
            delle Piaghe Cornejo, le nuove religiose assunsero la guida
            dell’istituto, garantendo continuità alla missione educativa iniziata
            nel XIX secolo.
          </p>
        ),
        media: (
          <MediaGrid
            rows={[
              ["aspect-[228/211]", "aspect-[228/211]"],
              ["aspect-[228/211]", "aspect-[228/211]"],
            ]}
            caption="Suor Lucia Orellana, suor Lidia, Suor Nieves e Suor Rosita"
          />
        ),
        mediaPosition: "bottom",
      },
    ],
  },
  {
    year: "2000",
    side: "right",
    cards: [
      {
        title: "Il riconoscimento della Parità scolastica",
        body: (
          <p>
            Il 9 novembre 2000 la scuola ottenne la Parità scolastica, entrando
            ufficialmente a far parte del sistema nazionale di istruzione. Questo
            importante risultato confermò la qualità del percorso educativo
            offerto dall’istituto.
          </p>
        ),
        media: <MediaPortraitPair />,
        mediaPosition: "top",
      },
    ],
  },
  {
    year: "2001",
    side: "left",
    cards: [
      {
        title: "Nasce il Nido d’Infanzia",
        body: (
          <p>
            Sotto la guida di Suor Nieves Carrion venne inaugurato il Nido
            d’Infanzia, destinato ad accogliere i bambini dai 18 ai 36 mesi.
            L’apertura del nido rappresentò un nuovo passo nell’ampliamento
            dell’offerta educativa e nella risposta alle esigenze delle famiglie
            del territorio.
          </p>
        ),
        media: (
          <div className="flex flex-col gap-2">
            <MediaSingle aspect="aspect-[472/313]" />
            <Caption>Le Suore Francescane con il personale della scuola</Caption>
          </div>
        ),
        mediaPosition: "top",
      },
    ],
  },
  {
    year: "Gli anni successivi",
    side: "right",
    cards: [
      {
        title: "Crescita e modernizzazione",
        body: (
          <p>
            Negli anni successivi le Suore Francescane hanno promosso numerosi
            interventi di rinnovamento strutturale. Sono stati creati nuovi spazi
            dedicati al Nido d’Infanzia “Le Ali del Paradiso”, sono stati
            realizzati laboratori e ambienti educativi innovativi e sono stati
            completamente riqualificati i cortili e le aree esterne, rendendoli
            più funzionali e sicuri per i bambini.
          </p>
        ),
        media: (
          <div className="flex items-stretch gap-4">
            <Frame className="aspect-[210/193] flex-1 self-center" />
            <Frame className="aspect-[246/317] w-[52%]" />
          </div>
        ),
        mediaPosition: "top",
      },
    ],
  },
  {
    year: "Oggi",
    side: "left",
    cards: [
      {
        title: "Una tradizione educativa che guarda al futuro",
        body: (
          <p>
            Oggi la Scuola Duchi Salviati continua la sua missione educativa
            forte di una storia iniziata oltre centosessant’anni fa. Nel solco
            dell’intuizione dei Duchi Salviati e dell’opera delle congregazioni
            religiose che si sono succedute nel tempo, la scuola continua a
            formare nuove generazioni ispirandosi ai valori cristiani, francescani
            e alla centralità della persona, mantenendo vivo un patrimonio
            educativo, culturale e spirituale unico per il territorio di
            Migliarino.
          </p>
        ),
        media: <MediaSingle aspect="aspect-[472/360]" />,
        mediaPosition: "top",
      },
    ],
  },
];

/* === Karte ============================================================= */
const TimelineCard = ({ card, side }: { card: Card; side: Entry["side"] }) => (
  <div
    className={cn(
      "flex flex-col gap-6 rounded-2xl rounded-tl-none bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]",
      side === "left" && "lg:rounded-tl-2xl lg:rounded-tr-none"
    )}
  >
    {card.media && card.mediaPosition !== "bottom" && card.media}
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-semibold tracking-tight text-black">
        {card.title}
      </h3>
      <div className="flex flex-col gap-3 text-base leading-[1.4] text-black [&_strong]:font-semibold">
        {card.body}
      </div>
    </div>
    {card.media && card.mediaPosition === "bottom" && card.media}
  </div>
);

/* === Timeline ========================================================== */
export const StoriaTimeline = () => {
  return (
    <ol className="relative">
      {/* Vertikale Linie: mobil links, ab lg mittig */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-grey lg:left-1/2 lg:-translate-x-px"
      />

      <div className="flex flex-col gap-12 lg:gap-16">
        {entries.map((entry) => (
          <li key={entry.year} className="relative">
            {/* Punkt auf der Linie */}
            <span
              aria-hidden
              className="absolute top-1.5 left-0 size-4 rounded-full border-2 border-grey bg-light-beige-50 lg:left-1/2 lg:-translate-x-1/2"
            />

            <div className="pl-9 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:pl-0">
              {/* Jahr */}
              <p
                className={cn(
                  "mb-4 text-2xl font-semibold tracking-tight text-black lg:row-start-1 lg:mb-0 lg:pt-1",
                  entry.side === "right"
                    ? "lg:col-start-1 lg:pr-8 lg:text-right"
                    : "lg:col-start-2 lg:pl-8 lg:text-left"
                )}
              >
                {entry.year}
              </p>

              {/* Karten */}
              <div
                className={cn(
                  "flex flex-col gap-8 lg:row-start-1",
                  entry.side === "right" ? "lg:col-start-2" : "lg:col-start-1"
                )}
              >
                {entry.cards.map((card) => (
                  <TimelineCard key={card.title} card={card} side={entry.side} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </div>
    </ol>
  );
};
