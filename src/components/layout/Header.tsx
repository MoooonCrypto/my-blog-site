import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          mokosauブログ
        </Link>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  ポートフォリオ
                </Link>
              </li>
              <li>
                <Link href="/sandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                  サンドボックス
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  プロフィール
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
