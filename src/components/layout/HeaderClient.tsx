"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/SocialIcon";
import { SideDrawer } from "@/components/layout/SideDrawer";

interface HeaderClientProps {
  socialLinks: Array<{
    platform: string;
    url: string;
    icon_url: string | null;
  }>;
}

export const HeaderClient = ({ socialLinks }: HeaderClientProps) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b glass-effect">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto py-1">
            {socialLinks.map((link) =>
              link.icon_url ? (
                <a
                  key={`${link.platform}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="h-8 w-8 shrink-0 overflow-hidden rounded-full transition-transform duration-200 hover:scale-105"
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

          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-md p-2 transition-colors hover:bg-muted"
              aria-label="メニューを開く"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pathname={pathname}
      />
    </>
  );
};
