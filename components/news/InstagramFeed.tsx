import Image from "next/image";

import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_PROFILE } from "@/lib/links";

export { INSTAGRAM_PROFILE };

export interface InstagramPost {
  image: string;
  /** Permalink des Beitrags; Standard = Profil. */
  href?: string;
  alt?: string;
}

/**
 * Zeigt die letzten Beiträge des Accounts @paritariasalviati.
 * Aktuell mit den im Design hinterlegten Bildern; für echte Live-Beiträge
 * können hier Permalinks (href) ergänzt oder ein Feed-Token angebunden werden.
 */
export const InstagramFeed = ({ posts }: { posts: InstagramPost[] }) => (
  <div className="grid gap-4 sm:grid-cols-3">
    {posts.map((post, i) => (
      <a
        key={i}
        href={post.href ?? INSTAGRAM_PROFILE}
        target="_blank"
        rel="noreferrer"
        className="group relative block aspect-square overflow-hidden rounded-2xl bg-light-beige-200"
      >
        <Image
          src={post.image}
          alt={post.alt ?? "Beitrag auf Instagram"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20" />
        <InstagramIcon className="absolute top-3 right-3 size-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
      </a>
    ))}
  </div>
);
