"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/sandbox", label: "Sandbox" },
    { href: "/blog", label: "Blog" },
    { href: "/profile", label: "Profile" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-tight hover:text-primary transition-colors"
        >
          MyPortfolio
        </Link>
        <nav className="flex items-center gap-2">
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
      </div>
    </header>
  );
};
