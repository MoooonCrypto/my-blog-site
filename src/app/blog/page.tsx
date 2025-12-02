import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyPosts = [
  {
    slug: "mastering-react-hooks",
    title: "React Hooksをマスターする",
    description: "クリーンで保守性の高いReactコンポーネントを作成するための、useState, useEffect, カスタムフックの詳細解説。",
    date: "2025年11月20日",
  },
  {
    slug: "nextjs-app-router-explained",
    title: "Next.js App Routerの解説",
    description: "Next.js 13+の新機能、App Routerを理解する。レイアウト、サーバーコンポーネント、データ取得戦略を含む。",
    date: "2025年11月15日",
  },
  {
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSSのベストプラクティス",
    description: "Tailwindを用いてスケーラブルで保守性の高いCSSを書くためのヒントとコツ。",
    date: "2025年11月10日",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">ブログ</h1>
        <p className="text-lg text-muted-foreground mt-2">技術、開発、その他もろもろについての雑記です。</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <CardHeader>
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild>
                <Link href={`/blog/${post.slug}`}>続きを読む</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
