import { CalendarPlus, Lightbulb } from "lucide-react";
import { getActiveHeaderNews } from "@/lib/header-news";

export const HeaderNews = async () => {
  const items = await getActiveHeaderNews();
  if (items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="w-full border-b border-light-beige">
          <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3">
            <p className="flex items-center gap-3 text-base leading-[1.4]">
              <Lightbulb className="size-5 shrink-0 text-black" aria-hidden />
              <span>
                <span className="font-semibold text-success">{item.label}</span>
                <span className="font-semibold text-black">: </span>
                <span className="text-black">{item.message}</span>
              </span>
            </p>

            <a
              href={`/api/header-news/${item.id}/calendar`}
              className="flex shrink-0 items-center gap-2 rounded-[8px] px-[17px] py-[9px] text-sm leading-[1.4] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              <CalendarPlus className="size-4 shrink-0" aria-hidden />
              Aggiungi al calendario
            </a>
          </div>
        </div>
      ))}
    </>
  );
};
