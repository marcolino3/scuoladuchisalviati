const legalBlocks: { title: string; body: React.ReactNode }[] = [
  {
    title: "Titolare del sito",
    body: (
      <>
        <p>Casa di Procura Missionaria</p>
        <p>Scuola Paritaria Duchi Salviati</p>
        <p>Indirizzo: Viale Dei Pini, 194 – 56019 Vecchiano (PI)</p>
        <p>
          Telefono: +39 050 804 100
          <br />
          Email: scuola.salviati@virgillio.it
        </p>
      </>
    ),
  },
  {
    title: "Responsabile dei contenuti",
    body: (
      <>
        <p>Scuola Duchi Salviati</p>
        <p>
          (Responsabile della redazione e dei contenuti presenti sul sito)
        </p>
      </>
    ),
  },
  {
    title: "Partita IVA",
    body: <p>Partita IVA: 01519250508</p>,
  },
  {
    title: "Limitazione di responsabilità",
    body: (
      <p>
        I testi, le informazioni e gli altri dati pubblicati in questo sito
        nonchè i link ad altri siti presenti sul web hanno esclusivamente scopo
        informativo e non assumono alcun carattere di ufficialità. Non assume
        alcuna responsabilità per eventuali errori od omissioni di qualsiasi tipo
        e per qualunque tipo di danno diretto, indiretto o accidentale derivante
        dalla lettura o dall’impiego delle informazioni pubblicate, o di qualsiasi
        forma di contenuto presente nel sito o per l’accesso o l’uso del materiale
        contenuto in altri siti.
      </p>
    ),
  },
  {
    title: "Contatti per comunicazioni legali",
    body: (
      <p>
        Email:{" "}
        <a className="underline" href="mailto:scuola.salviati@virgillio.it">
          scuola.salviati@virgillio.it
        </a>
      </p>
    ),
  },
];

const ImpressumPage = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h1 className="text-3xl font-semibold tracking-tight text-black lg:text-4xl">
            Impressum
          </h1>

          <div className="flex flex-col gap-8">
            {legalBlocks.map((block) => (
              <section key={block.title}>
                <h2 className="text-base font-semibold text-black">
                  {block.title}
                </h2>
                <div className="mt-1 flex flex-col gap-1 text-base leading-[1.4] text-black">
                  {block.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImpressumPage;
