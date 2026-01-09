import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPublishedBlogPosts } from "@/lib/api/blog";
import { Calendar, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center animate-fade-in-up opacity-0">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            技術、開発、その他について
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">まだ公開されている記事がありません</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post, index) => (
              <Card
                key={post.slug}
                className="card-hover border-border/50 flex flex-col overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
              >
                {/* Thumbnail */}
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `url(${post.featured_image})`,
                      }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("ja-JP")
                      : "未設定"}
                  </div>
                  <CardTitle className="font-heading">{post.title}</CardTitle>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={`/blog/${post.slug}`}>記事を読む</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
