import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ダミーデータ
const dummyProfile = {
  name: "mokosau",
  avatar_url: "https://via.placeholder.com/96", // プレースホルダー画像
  bio: "Web技術を中心に、新しいことを学ぶのが好きな開発者です。このサイトでは、作成したプロダクトや日々の学びを記録しています。",
};

const allProducts = [
  {
    id: "p1",
    title: "Eコマースプラットフォーム",
    description: "Next.jsとStripeを利用した本格的なEコマースサイト。",
    type: "portfolio",
  },
  {
    id: "s1",
    title: "リアルタイムチャットアプリ",
    description: "WebSocketを使ったリアルタイムメッセージングアプリの実験。",
    type: "sandbox",
  },
  {
    id: "p2",
    title: "タスク管理アプリ",
    description: "リアルタイム更新機能を持つ共同タスク管理ツール。",
    type: "portfolio",
  },
  {
    id: "s2",
    title: "AI画像認識モデル",
    description: "AIが画像を識別するコンセプト実証モデル。",
    type: "sandbox",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* プロフィールサマリー */}
      <section className="flex items-center gap-6 mb-16">
        <img
          src={dummyProfile.avatar_url}
          alt={dummyProfile.name}
          className="w-24 h-24 rounded-full border-2"
        />
        <div>
          <h1 className="text-2xl font-bold">{dummyProfile.name}</h1>
          <p className="text-muted-foreground mt-1">{dummyProfile.bio}</p>
        </div>
      </section>

      {/* プロダクト一覧 */}
      <section>
        <h2 className="text-3xl font-bold mb-8">プロダクト一覧</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/${product.type}/${product.id}`}>詳細を見る</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
