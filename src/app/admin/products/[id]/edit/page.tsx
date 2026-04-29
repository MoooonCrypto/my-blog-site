import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/api/products";
import ProductForm from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4 mr-2" />プロダクト一覧
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-heading font-bold">プロダクト編集</h1>
          <p className="text-muted-foreground mt-1">{product.title}</p>
        </header>
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
