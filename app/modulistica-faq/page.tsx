import { ModulisticaTabs } from "@/components/modulistica/ModulisticaTabs";
import { Accordion, type FaqItem } from "@/components/ui/Accordion";

const OrariAnswer = () => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="font-semibold text-black">Nido d’Infanzia</p>
      <ul className="mt-1 list-disc pl-5">
        <li>Accoglienza anticipata disponibile</li>
        <li>
          Servizio a tempo pieno con assistenza prima e dopo le attività educative
        </li>
        <li>
          Per gli orari dettagliati è consigliabile contattare direttamente la
          segreteria, poiché non risultano pubblicati nella documentazione
          consultata.
        </li>
      </ul>
    </div>
    <div>
      <p className="font-semibold text-black">Scuola dell’Infanzia</p>
      <ul className="mt-1 list-disc pl-5">
        <li>Entrata: 09:00 – 09:30</li>
        <li>Attività didattiche: 09:30 – 16:00</li>
        <li>Uscita senza mensa: 11:15 – 11:30</li>
        <li>Uscita dopo il pranzo: 13:00 – 13:30</li>
        <li>Uscita pomeridiana: 16:30</li>
      </ul>
    </div>
    <div>
      <p className="font-semibold text-black">Scuola Primaria</p>
      <ul className="mt-1 list-disc pl-5">
        <li>
          La scuola offre il servizio di tempo pieno con accoglienza prima e dopo
          le lezioni.
        </li>
        <li>
          Gli orari specifici della Primaria non sono riportati nella homepage o
          nei documenti pubblicamente accessibili.
        </li>
      </ul>
    </div>
  </div>
);

const faqItems: FaqItem[] = [
  {
    question: "Quanto costa la scuola?",
    answer:
      "La nostra è una scuola paritaria. È previsto uno sconto del 10% per il secondo figlio. Per un preventivo dettagliato, contattaci.",
  },
  {
    question: "Quali sono gli orari di accoglienza?",
    answer: <OrariAnswer />,
  },
  {
    question: "Come funziona l’iscrizione?",
    answer:
      "Scarica il modulo d’iscrizione del livello scolastico desiderato qui sopra, compilalo e contattaci per completare la procedura di ammissione.",
  },
  {
    question: "Cosa viene cucinato in mensa?",
    answer:
      "La nostra mensa interna prepara ogni giorno pasti freschi con prodotti a km zero, da oltre 20 anni, con attenzione alla qualità e al benessere dei bambini.",
  },
  {
    question:
      "Di quali materiali ha bisogno mio figlio per iniziare la scuola o il Nido?",
    answer:
      "Al momento dell’iscrizione ti forniremo l’elenco completo del materiale necessario per il livello scolastico del tuo bambino.",
  },
];

const ModulisticaFaqPage = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* === Modulistica ========================================== */}
        <section>
          <header className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
              Modulistica
            </h1>
            <p className="mt-4 text-lg font-medium text-black/80 lg:text-xl">
              Scarica facilmente tutta la modulistica della scuola
            </p>
          </header>

          <ModulisticaTabs />
        </section>

        {/* === FAQ ================================================== */}
        <section className="mt-20 lg:mt-28">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-black lg:text-5xl">
            FAQ
          </h2>
          <Accordion items={faqItems} className="mx-auto mt-10 max-w-3xl" />
        </section>
      </div>
    </main>
  );
};

export default ModulisticaFaqPage;
