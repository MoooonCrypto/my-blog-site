import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPortfolioItemById } from "@/lib/api/portfolio";
import PortfolioForm from "../../PortfolioForm";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  // middlewareで既に認証済み

  let item;
  try {
    item = await getPortfolioItemById(params.id);
  } catch (error) {
    notFound();
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="mb-8 animate-fade-in-up opacity-0">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/admin/portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              一覧に戻る
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
            プロジェクトを編集
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {item.title}
          </p>
        </header>

        <PortfolioForm initialData={item} />
      </div>
    </div>
  );
}
