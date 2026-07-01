import { ExternalLink } from "lucide-react";

import {
  INSTAGRAM_PROFILE,
  InstagramFeed,
} from "@/components/news/InstagramFeed";
import { StoriaTimeline } from "@/components/news/StoriaTimeline";
import { BrandButton } from "@/components/ui/BrandButton";
import { Bubble } from "@/components/ui/Bubble";
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
        {/* === Intro ================================================= */}
        <section className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Bubble
            src="/images/news/intro-edificio.jpg"
            alt="L’edificio dell’Istituto Duchi Salviati"
            className="mx-auto size-44 shrink-0 sm:size-52"
          />
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

        {/* === Le tappe della nostra storia ========================= */}
        <section className="mt-20 lg:mt-28">
          <header className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-black lg:text-5xl">
              Le tappe della nostra storia
            </h2>
            <p className="mt-4 text-2xl leading-[1.1] font-semibold tracking-tight text-black lg:text-[2rem]">
              Oltre 160 anni di educazione, accoglienza e crescita
            </p>
          </header>

          <div className="mt-10 rounded-[24px] bg-light-beige-50 px-4 py-10 sm:px-8 lg:mt-12 lg:px-10 lg:py-16">
            <StoriaTimeline />
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsStoriaPage;
