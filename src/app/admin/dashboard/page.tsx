import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ダッシュボード用のダミーデータ
const contentSummary = {
  portfolio: 3,
  sandbox: 2,
  blogPosts: 3,
};

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">管理ダッシュボード</h1>
        <p className="text-lg text-muted-foreground mt-2">ここからサイトのコンテンツを管理します。</p>
      </header>
      <div className="grid md:grid-cols-3 gap-8">
        {/* ポートフォリオ管理 */}
        <Card>
          <CardHeader>
            <CardTitle>ポートフォリオ</CardTitle>
            <CardDescription>
              現在 {contentSummary.portfolio} 件のプロジェクトが登録されています。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/portfolio">ポートフォリオを管理</Link>
            </Button>
          </CardContent>
        </Card>

        {/* サンドボックス管理 */}
        <Card>
          <CardHeader>
            <CardTitle>サンドボックス</CardTitle>
            <CardDescription>
              現在 {contentSummary.sandbox} 件のプロジェクトが登録されています。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/sandbox">サンドボックスを管理</Link>
            </Button>
          </CardContent>
        </Card>

        {/* ブログ管理 */}
        <Card>
          <CardHeader>
            <CardTitle>ブログ記事</CardTitle>
            <CardDescription>
              現在 {contentSummary.blogPosts} 件の記事が公開されています。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blog">ブログを管理</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
