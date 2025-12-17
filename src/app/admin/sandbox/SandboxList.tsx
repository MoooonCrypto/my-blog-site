"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SandboxItem } from "@/lib/api/sandbox";
import { Edit, Trash2, ExternalLink, Github, AlertCircle } from "lucide-react";

interface SandboxListProps {
  items: SandboxItem[];
}

export default function SandboxList({ items }: SandboxListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除してもよろしいですか？この操作は取り消せません。`)) {
      return;
    }

    setDeletingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/sandbox/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "削除に失敗しました");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting sandbox item:", error);
      setError(
        error instanceof Error
          ? error.message
          : "アイテムの削除に失敗しました。もう一度お試しください。"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">
            まだSandboxアイテムがありません
          </p>
          <Button asChild>
            <Link href="/admin/sandbox/new">最初の実験を作成</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-destructive">エラーが発生しました</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {items.map((item, index) => (
        <Card
          key={item.id}
          className="card-hover border-border/50 animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="font-heading text-lg truncate">
                    {item.title}
                  </CardTitle>
                  {item.published ? (
                    <Badge variant="default" className="flex-shrink-0">公開中</Badge>
                  ) : (
                    <Badge variant="secondary" className="flex-shrink-0">下書き</Badge>
                  )}
                  {item.status && (
                    <Badge variant="outline" className="flex-shrink-0">{item.status}</Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.demo_url && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    title="デモを見る"
                  >
                    <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {item.github_url && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    title="GitHubで見る"
                  >
                    <a href={item.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  title="編集"
                >
                  <Link href={`/admin/sandbox/${item.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={deletingId === item.id}
                  title="削除"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>順序: {item.display_order ?? 0}</span>
              {item.published_at && (
                <span>
                  公開日: {new Date(item.published_at).toLocaleDateString("ja-JP")}
                </span>
              )}
              <span>
                更新: {new Date(item.updated_at || item.created_at || "").toLocaleDateString("ja-JP")}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
