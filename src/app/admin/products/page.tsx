import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import { getAllProducts } from "@/lib/api/products";
import ProductList from "./ProductList";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />ダッシュボード
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
              プロダクト管理
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            プロダクトの追加・編集・削除を行います
          </p>
        </header>

        <ProductList products={products} />
      </div>
    </div>
  );
}
