"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/SocialIcon";
import { SideDrawer } from "@/components/layout/SideDrawer";
import { cn } from "@/lib/utils";

type SocialLinkItem = {
  platform: string;
  title: string | null;
  url: string;
  icon: string | null;
};

interface HeaderClientProps {
  headerSocialLinks: SocialLinkItem[];
  allSocialLinks: SocialLinkItem[];
}

export const HeaderClient = ({ headerSocialLinks, allSocialLinks }: HeaderClientProps) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/profile", label: "Profile" },
  ];

  const renderHeaderIcon = (item: SocialLinkItem) => {
    if (item.icon && item.icon.trim() !== "") {
      return (
        <Link
          key={`${item.platform}-${item.url}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
        >
          <Image src={item.icon} alt={item.platform} width={20} height={20} className="rounded-sm" />
        </Link>
      );
    }
    return <SocialIcon key={`${item.platform}-${item.url}`} platform={item.platform} href={item.url} />;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b glass-effect">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-lg md:text-2xl tracking-tight hover:text-primary transition-colors flex-shrink-0"
          >
            mokosau
          </Link>

          {/* Desktop: header SNS icons (show_in_header=true, max 5) */}
          {headerSocialLinks.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {headerSocialLinks.map((item) => renderHeaderIcon(item))}
            </div>
          )}

          {/* Desktop: nav + ThemeToggle + drawer trigger */}
          <nav className="hidden md:flex items-center gap-2">
            <ul className="flex items-center space-x-1 mr-2">
              {navLinks.map((link) => (
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
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="メニューを開く"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>

          {/* Mobile: ThemeToggle + drawer trigger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
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
        allSocialLinks={allSocialLinks}
        pathname={pathname}
      />
    </>
  );
};
