import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { getAllBlogPosts } from "@/lib/api/blog";
import BlogPostsList from "./BlogPostsList";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ダッシュボードに戻る
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
                ブログ記事管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                ブログ記事の作成、編集、削除ができます
              </p>
            </div>
            <Button asChild size="sm" className="gap-2">
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4" />
                新規作成
              </Link>
            </Button>
          </div>
        </header>

        {/* Posts List */}
        <BlogPostsList initialPosts={posts} />
      </div>
    </div>
  );
}
