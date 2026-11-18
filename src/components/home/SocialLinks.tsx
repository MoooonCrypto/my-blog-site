import Image from "next/image";
import { SocialIcon } from "@/components/SocialIcon";

interface SocialLinksProps {
  links: Array<{
    platform: string;
    url: string;
    icon_url: string | null;
  }>;
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <section aria-label="SNSリンク" className="mb-10 flex justify-center md:justify-start">
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/55 p-1.5 shadow-sm backdrop-blur-sm">
        {links.map((link) =>
          link.icon_url ? (
            <a
              key={`${link.platform}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="h-8 w-8 overflow-hidden rounded-full transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={link.icon_url}
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </a>
          ) : (
            <SocialIcon key={`${link.platform}-${link.url}`} platform={link.platform} href={link.url} />
          )
        )}
      </div>
    </section>
  );
}
