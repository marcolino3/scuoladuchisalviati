import { Bubble } from "@/components/ui/Bubble";

const ChiSiamoPage = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-black lg:text-[3.875rem]">
            Chi siamo
          </h1>
          <p className="mt-4 text-lg font-medium text-black/80 lg:text-xl">
            Da generazioni al fianco delle famiglie per educare, accogliere e far
            crescere ogni bambino.
          </p>
        </header>

        {/* Bild-Reihe (Platzhalter) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:mt-16 lg:gap-8">
          <Bubble
            src="/images/chi-siamo/drop-1.jpg"
            className="size-56 sm:size-64 lg:size-72"
          />
          <Bubble
            src="/images/chi-siamo/drop-2.jpg"
            className="size-56 sm:size-64 lg:size-72"
          />
          <Bubble
            src="/images/chi-siamo/drop-3.jpg"
            className="size-56 sm:size-64 lg:size-72"
          />
        </div>
      </div>
    </main>
  );
};

export default ChiSiamoPage;
