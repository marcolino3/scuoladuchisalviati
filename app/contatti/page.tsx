import Image from "next/image";

import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_PROFILE } from "@/lib/links";

const Contatti = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* Hero-Bild */}
        <div className="aspect-[1256/570] w-full overflow-hidden rounded-[24px]">
          <Image
            src="/images/contatti/hero.jpg"
            alt="Istituto Duchi Salviati"
            width={1256}
            height={570}
            priority
            className="size-full object-cover"
          />
        </div>

        <section className="mt-10">
          <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
            Contattaci
          </h1>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-8">
            {/* Linke Spalte – Name der Einrichtung (groß) */}
            <div className="text-2xl leading-[1.2] text-black sm:text-3xl lg:text-[2rem]">
              <p className="font-semibold">Casa di Procura Missionaria</p>
              <p className="font-semibold">Scuola Paritaria Duchi Salviati</p>
              <p>Nido, Materna ed Elementare</p>
            </div>

            {/* Rechte Spalte – Intro + Kontaktdaten */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-base leading-[1.4] text-black">
                <p>
                  Siamo sempre a disposizione per rispondere alle tue domande e
                  fornirti tutte le informazioni sulla nostra scuola. Che tu voglia
                  conoscere meglio il Nido, la Scuola dell’Infanzia, la Scuola
                  Primaria o i servizi offerti, saremo lieti di aiutarti.
                </p>
                <p>
                  Contattaci telefonicamente o via e-mail: ti risponderemo il prima
                  possibile e saremo felici di accoglierti presso il nostro
                  Istituto.
                </p>
              </div>

              {/* Telefono & Email */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg leading-[1.2] text-black">Telefono</p>
                  <a
                    className="font-semibold text-black underline"
                    href="tel:+39050804100"
                  >
                    +39 050 804 100
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg leading-[1.2] text-black">Email</p>
                  <a
                    className="text-lg font-semibold text-black underline"
                    href="mailto:scuola.salviati@virgillio.it"
                  >
                    scuola.salviati@virgillio.it
                  </a>
                </div>
              </div>

              {/* Orari & Sede */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <p className="leading-[1.2] text-black">Orari del laboratorio</p>
                  <p className="font-semibold text-black">
                    Lunedì a Venerdì: 9:00–17:00
                    <br />
                    Sabato e Domenica chiuso
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="leading-[1.2] text-black">Sede</p>
                  <p className="font-semibold text-black">
                    Viale Dei Pini, 194
                    <br />
                    56019 Vecchiano (PI)
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-2">
                <p className="text-lg leading-[1.2] text-black">
                  Seguici su Instagram
                </p>
                <a
                  href={INSTAGRAM_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-black underline"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contatti;
