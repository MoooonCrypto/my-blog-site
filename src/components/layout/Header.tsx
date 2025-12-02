import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          MyPortfolio
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/sandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                Sandbox
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
