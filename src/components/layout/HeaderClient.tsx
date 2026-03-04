"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/SocialIcon";
import { cn } from "@/lib/utils";

type SocialLinkData = {
  url: string | null;
  icon: string | null;
};

type SocialLinks = {
  x: SocialLinkData;
  instagram: SocialLinkData;
  tiktok: SocialLinkData;
  youtube: SocialLinkData;
  note: SocialLinkData;
  zenn: SocialLinkData;
  qiita: SocialLinkData;
  other: SocialLinkData;
} | null;

interface HeaderClientProps {
  socialLinks: SocialLinks;
}

export const HeaderClient = ({ socialLinks }: HeaderClientProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/sandbox", label: "Sandbox" },
    { href: "/blog", label: "Blog" },
    { href: "/profile", label: "Profile" },
  ];

  // Filter only social links that have a URL
  const activeSocialLinks = socialLinks
    ? Object.entries(socialLinks).filter(
        ([_, data]) => data.url && data.url.trim() !== ""
      )
    : [];

  const renderSocialIcon = (platform: string, data: SocialLinkData) => {
    if (!data.url) return null;
    if (data.icon && data.icon.trim() !== "") {
      return (
        <Link
          key={platform}
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
        >
          <Image
            src={data.icon}
            alt={platform}
            width={20}
            height={20}
            className="rounded-sm"
          />
        </Link>
      );
    }
    return (
      <SocialIcon key={platform} platform={platform as any} href={data.url} />
    );
  };

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

        {/* Social Icons - Desktop only */}
        {activeSocialLinks.length > 0 && (
          <div className="hidden md:flex items-center gap-2">
            {activeSocialLinks.map(([platform, data]) =>
              renderSocialIcon(platform, data)
            )}
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <ul className="flex items-center space-x-1 mr-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
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

        {/* Mobile: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Social Icons - always visible, part of sticky header */}
      {activeSocialLinks.length > 0 && (
        <div className="md:hidden border-t border-border/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-2">
              {activeSocialLinks.map(([platform, data]) =>
                renderSocialIcon(platform, data)
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 glass-effect">
          <div className="container mx-auto px-4 py-3">
            <ul className="flex flex-col space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
