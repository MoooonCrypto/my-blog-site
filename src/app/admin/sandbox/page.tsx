import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllSandboxItems } from "@/lib/api/sandbox";
import SandboxList from "./SandboxList";
import { Plus, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

async function SandboxContent() {
  const items = await getAllSandboxItems();
  return <SandboxList items={items} />;
}

export default async function SandboxAdminPage() {
  // middlewareで既に認証済み

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 animate-fade-in-up opacity-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
                Sandbox管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                実験プロジェクトを管理・公開します
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
                <Link href="/admin/sandbox/new">
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
          <SandboxContent />
        </Suspense>
      </div>
    </div>
  );
}
