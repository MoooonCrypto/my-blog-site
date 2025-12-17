import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedPortfolioItems } from "@/lib/api/portfolio";
import { getPublishedBlogPosts } from "@/lib/api/blog";

export const dynamic = "force-dynamic";

export default async function Home() {
  // DBから実データを取得
  const portfolioItems = await getPublishedPortfolioItems();
  const blogPosts = await getPublishedBlogPosts();

  // 最新5件のみ表示
  const recentPortfolio = portfolioItems.slice(0, 5);
  const recentBlogPosts = blogPosts.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Products Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">プロダクト</h2>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/portfolio">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 px-4">
            {recentPortfolio.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                まだ公開されているプロジェクトがありません
              </p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {recentPortfolio.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.id}`}
                    className={`group flex-shrink-0 snap-start animate-fade-in-up opacity-0`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden card-hover border border-border/50">
                      {project.featured_image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 60%, hsl(var(--background))), url(${project.featured_image})`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-heading font-bold text-sm md:text-base line-clamp-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">記事一覧</h2>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/blog">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 px-4">
            {recentBlogPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                まだ公開されている記事がありません
              </p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {recentBlogPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group flex-shrink-0 snap-start animate-fade-in-up opacity-0`}
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden card-hover border border-border/50">
                      {post.featured_image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 60%, hsl(var(--background))), url(${post.featured_image})`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString("ja-JP")
                            : ""}
                        </p>
                        <h3 className="font-heading font-bold text-sm md:text-base line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
