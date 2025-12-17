import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import PortfolioList from "./PortfolioList";
import { Plus, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

async function PortfolioContent() {
  try {
    const items = await getAllPortfolioItems();
    console.log('[Portfolio] 取得したアイテム数:', items?.length ?? 0);
    return <PortfolioList items={items || []} />;
  } catch (error) {
    console.error('[Portfolio] データ取得エラー:', error);
    return (
      <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="font-medium text-destructive">データの取得に失敗しました</p>
        <p className="text-sm text-destructive/80 mt-2">
          {error instanceof Error ? error.message : '不明なエラーが発生しました'}
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          コンソールログを確認してください
        </p>
      </div>
    );
  }
}

export default async function PortfolioAdminPage() {
  // middlewareで既に認証済み

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 animate-fade-in-up opacity-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
                ポートフォリオ管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                プロジェクトを管理・公開します
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/admin/portfolio/new">
                  <Plus className="h-4 w-4 mr-2" />
                  新規作成
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <Suspense
          fallback={
            <div className="text-center py-12 text-muted-foreground">
              読み込み中...
            </div>
          }
        >
          <PortfolioContent />
        </Suspense>
      </div>
    </div>
  );
}
