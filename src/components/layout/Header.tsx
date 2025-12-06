"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/SocialIcon";
import { cn } from "@/lib/utils";

// TODO: これらの値は将来的に管理画面から設定できるようにする
const socialLinks = {
  x: "https://twitter.com/mokosau",
  instagram: "https://instagram.com/mokosau",
  tiktok: "https://tiktok.com/@mokosau",
  youtube: "https://youtube.com/@mokosau",
  note: "https://note.com/mokosau",
  zenn: "https://zenn.dev/mokosau",
  qiita: "https://qiita.com/mokosau",
};

export const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/sandbox", label: "Sandbox" },
    { href: "/blog", label: "Blog" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-lg md:text-2xl tracking-tight hover:text-primary transition-colors flex-shrink-0"
        >
          MokosauBlog
        </Link>

        {/* Social Icons - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <SocialIcon platform="x" href={socialLinks.x} />
          <SocialIcon platform="instagram" href={socialLinks.instagram} />
          <SocialIcon platform="tiktok" href={socialLinks.tiktok} />
          <SocialIcon platform="youtube" href={socialLinks.youtube} />
          <SocialIcon platform="note" href={socialLinks.note} />
          <SocialIcon platform="zenn" href={socialLinks.zenn} />
          <SocialIcon platform="qiita" href={socialLinks.qiita} />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          <ul className="flex items-center space-x-0.5 md:space-x-1 mr-1 md:mr-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-2 md:px-3 py-2 text-xs md:text-sm font-medium rounded-md transition-all duration-200",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile Social Icons - Show below header */}
      <div className="md:hidden border-t border-border/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-2">
            <SocialIcon platform="x" href={socialLinks.x} />
            <SocialIcon platform="instagram" href={socialLinks.instagram} />
            <SocialIcon platform="tiktok" href={socialLinks.tiktok} />
            <SocialIcon platform="youtube" href={socialLinks.youtube} />
            <SocialIcon platform="note" href={socialLinks.note} />
            <SocialIcon platform="zenn" href={socialLinks.zenn} />
            <SocialIcon platform="qiita" href={socialLinks.qiita} />
          </div>
        </div>
      </div>
    </header>
  );
};
