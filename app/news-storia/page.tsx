import Image from "next/image";
import { ExternalLink } from "lucide-react";

import {
  INSTAGRAM_PROFILE,
  InstagramFeed,
} from "@/components/news/InstagramFeed";
import { BrandButton } from "@/components/ui/BrandButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

const instagramPosts = [
  { image: "/images/news/instagram-1.png" },
  { image: "/images/news/instagram-2.png" },
  { image: "/images/news/instagram-3.png" },
];

const NewsStoriaPage = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        {/* === Intro mit Wappen ====================================== */}
        <section className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="mx-auto w-44 shrink-0 overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_8px_28px_rgba(139,145,154,0.28)] sm:w-52">
            <Image
              src="/wappen.png"
              alt="Wappen des Istituto Duchi Salviati"
              width={400}
              height={490}
              priority
              className="h-auto w-full rounded-[16px] object-contain"
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-black lg:text-[3.875rem] lg:leading-[1.1]">
              News, eventi e la nostra storia
            </h1>
            <p className="mt-4 text-base leading-[1.4] text-black">
              Scopri la vita quotidiana dell’Istituto Duchi Salviati attraverso le
              ultime novità, gli eventi e i momenti più significativi condivisi sui
              nostri canali social. In questa pagina potrai seguire da vicino le
              attività della scuola e conoscere la storia e i valori che da
              generazioni accompagnano il nostro percorso educativo.
            </p>
          </div>
        </section>

        {/* === Instagram ============================================= */}
        <section className="mt-16 lg:mt-20">
          <div className="rounded-[24px] border border-light-beige-200 bg-white p-5 sm:p-8">
            <InstagramFeed posts={instagramPosts} />

            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-navy">
                  <InstagramIcon className="size-6 shrink-0" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Uno sguardo alla nostra quotidianità
                  </h2>
                </div>
                <p className="mt-3 text-base leading-[1.4] text-black">
                  Attraverso il nostro Instagram condividiamo momenti autentici
                  della vita scolastica: attività, progetti, eventi e piccoli gesti
                  quotidiani che raccontano l’atmosfera serena e familiare
                  dell’Istituto Duchi Salviati. Un modo semplice per restare sempre
                  aggiornati e vivere da vicino la nostra comunità educativa.
                </p>
              </div>
              <BrandButton
                href={INSTAGRAM_PROFILE}
                variant="outline"
                iconRight={ExternalLink}
                className="shrink-0 self-start lg:self-center"
              >
                Seguici su Instagram
              </BrandButton>
            </div>
          </div>
        </section>

        {/* === La nostra storia ===================================== */}
        <section className="mt-20 lg:mt-28">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-black lg:text-5xl">
            La nostra storia
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h3 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
              Una storia di educazione e crescita
            </h3>
            <p className="text-base leading-[1.4] text-black">
              Da generazioni l’Istituto Duchi Salviati accompagna bambini e
              famiglie con passione, dedizione e attenzione alla persona. Scopri le
              origini della nostra scuola e i valori che ancora oggi guidano il
              nostro percorso educativo.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {["/images/news/storia-1.png", "/images/news/storia-2.png"].map(
              (src) => (
                <div
                  key={src}
                  className="aspect-[528/572] overflow-hidden rounded-[20px] bg-light-beige-200"
                >
                  <Image
                    src={src}
                    alt=""
                    width={528}
                    height={572}
                    className="size-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsStoriaPage;
