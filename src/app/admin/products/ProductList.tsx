"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import type { ProductWithScreenshots } from "@/lib/api/products";

interface ProductListProps {
  products: ProductWithScreenshots[];
}

const PLATFORM_LABEL: Record<string, string> = {
  ios: "iOS", android: "Android", web: "Web", other: "Other",
};

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [list, setList] = useState(products);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？この操作は元に戻せません。`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setList((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("削除に失敗しました");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{products.length}件のプロダクト</p>
        <Button asChild size="sm">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />新規作成
          </Link>
        </Button>
      </div>

      {list.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">まだプロダクトがありません</p>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />最初のプロダクトを作成
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((product) => (
            <Card key={product.id} className="border-border/50">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden border border-border/50 bg-muted">
                    {product.icon_url ? (
                      <img src={product.icon_url} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
                        <span className="text-xl font-bold text-primary/60">
                          {product.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold font-heading truncate">{product.title}</h3>
                      <Badge variant={product.published ? "default" : "secondary"} className="text-xs">
                        {product.published ? "公開" : "非公開"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {PLATFORM_LABEL[product.platform] ?? product.platform}
                      </Badge>
                      {product.screenshots.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          スクリーンショット {product.screenshots.length}枚
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">/{product.slug}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {product.published && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/products/${product.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(product.id, product.title)}
                      disabled={deletingId === product.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
