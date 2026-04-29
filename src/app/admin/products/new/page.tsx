import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
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
          <h1 className="text-3xl font-heading font-bold">新規プロダクト作成</h1>
        </header>
        <ProductForm />
      </div>
    </div>
  );
}
