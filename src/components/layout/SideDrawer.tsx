"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { SocialIconGlyph } from "@/components/SocialIcon";
import { cn } from "@/lib/utils";

type SocialLinkItem = {
  platform: string;
  url: string;
  icon: string | null;
};

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allSocialLinks: SocialLinkItem[];
  pathname: string;
}

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/profile", label: "Profile" },
];

export const SideDrawer = ({ isOpen, onClose, allSocialLinks, pathname }: SideDrawerProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[60] h-full w-72 bg-background border-l border-border shadow-2xl",
          "transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="サイドメニュー"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border flex-shrink-0">
          <span className="font-heading font-bold text-base">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="メニューを閉じる"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Navigation */}
          <section className="px-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Navigation
            </p>
            <ul className="space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
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
          </section>

          {/* Media */}
          {allSocialLinks.length > 0 && (
            <section className="px-5">
              <ul className="space-y-0.5">
                {allSocialLinks.map((item) => (
                  <li key={`${item.platform}-${item.url}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                        {item.icon && item.icon.trim() !== "" ? (
                          <Image
                            src={item.icon}
                            alt={item.platform}
                            width={28}
                            height={28}
                            className="rounded-full object-cover w-8 h-8"
                          />
                        ) : (
                          <SocialIconGlyph platform={item.platform} />
                        )}
                      </span>
                      <span>{item.platform}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
