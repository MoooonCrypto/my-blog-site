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
import { Edit, Trash2, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/api/blog";

interface BlogPostsListProps {
  initialPosts: BlogPost[];
}

export default function BlogPostsList({ initialPosts }: BlogPostsListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) {
      return;
    }

    setIsDeleting(id);

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("削除に失敗しました");
      }

      setPosts(posts.filter((p) => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("記事の削除に失敗しました");
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "未設定";
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-bold">
        記事一覧 ({posts.length})
      </h2>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">まだ記事がありません</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/blog/new">最初の記事を作成</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className={`card-hover border-border/50 animate-fade-in-up opacity-0 delay-${Math.min(index * 100, 500)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="font-heading text-lg truncate">
                        {post.title}
                      </CardTitle>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                          post.published
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.published ? "公開" : "下書き"}
                      </span>
                    </div>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>スラッグ: {post.slug}</span>
                      <span>作成日: {formatDate(post.created_at)}</span>
                      {post.published_at && (
                        <span>公開日: {formatDate(post.published_at)}</span>
                      )}
                      {post.view_count !== null && post.view_count > 0 && (
                        <span>閲覧数: {post.view_count}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id, post.title)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      disabled={isDeleting === post.id}
                    >
                      {isDeleting === post.id ? (
                        <span className="h-4 w-4 animate-spin">⏳</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
