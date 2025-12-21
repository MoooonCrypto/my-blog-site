import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug } from "@/lib/api/blog";
import { Calendar, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;

  try {
    post = await getBlogPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  // 閲覧数をインクリメント（エラーを無視）
  // incrementViewCount(post.id).catch(() => {});

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in-up opacity-0">
            <Link href="/" className="hover:text-foreground transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              ブログ
            </Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>

          {/* Header */}
          <header className="mb-8 animate-fade-in-up opacity-0 delay-100">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(post.published_at).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Thumbnail */}
          {post.featured_image && (
            <div className="mb-8 animate-fade-in-up opacity-0 delay-200">
              <div
                className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border/50"
                style={{
                  backgroundImage: `url(${post.featured_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12 animate-fade-in-up opacity-0 delay-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Footer */}
          <footer className="pt-8 border-t animate-fade-in-up opacity-0 delay-400">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ブログ一覧に戻る
              </Link>
            </Button>
          </footer>
        </article>
      </div>
    </div>
  );
}
