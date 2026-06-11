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

        <section className="mt-12">
          <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
            Contattaci
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Linke Spalte */}
            <div className="text-base leading-[1.5] text-black">
              <p className="font-semibold">Casa di Procura Missionaria</p>
              <p className="font-semibold">Scuola Paritaria Duchi Salviati</p>
              <p>Nido, Materna ed Elementare</p>
            </div>

            {/* Rechte Spalte */}
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

              <dl className="flex flex-col gap-4 text-base leading-[1.4] text-black">
                <div>
                  <dt className="text-black/60">Telefono</dt>
                  <dd>
                    <a className="underline" href="tel:+39050804100">
                      +39 050 804 100
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Email</dt>
                  <dd>
                    <a
                      className="underline"
                      href="mailto:scuola.salviati@virgillio.it"
                    >
                      scuola.salviati@virgillio.it
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Orari del laboratorio</dt>
                  <dd className="font-semibold">
                    Lunedì a Venerdì: 9:00–17:00
                    <br />
                    Sabato e Domenica chiuso
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Sede</dt>
                  <dd className="font-semibold">
                    Viale Dei Pini, 194
                    <br />
                    56019 Vecchiano (PI)
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Seguici su Instagram</dt>
                  <dd>
                    <a
                      href={INSTAGRAM_PROFILE}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline"
                    >
                      <InstagramIcon className="size-5 shrink-0" />
                      Instagram
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contatti;
