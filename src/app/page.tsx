import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/SocialIcon";
import { getPublishedPortfolioItems } from "@/lib/api/portfolio";
import { getPublishedBlogPosts } from "@/lib/api/blog";
import { getPublishedSandboxItems } from "@/lib/api/sandbox";
import { getProfile } from "@/lib/api/profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [portfolioItems, blogPosts, sandboxItems, profile] = await Promise.all([
    getPublishedPortfolioItems(),
    getPublishedBlogPosts(),
    getPublishedSandboxItems(),
    getProfile(),
  ]);

  const recentPortfolio = portfolioItems.slice(0, 5);
  const recentBlogPosts = blogPosts.slice(0, 4);
  const recentSandbox = sandboxItems.slice(0, 5);

  const activeSocialLinks = profile
    ? Object.entries({
        x: { url: profile.social_x_url, icon: profile.social_x_icon_url },
        instagram: { url: profile.social_instagram_url, icon: profile.social_instagram_icon_url },
        tiktok: { url: profile.social_tiktok_url, icon: profile.social_tiktok_icon_url },
        youtube: { url: profile.social_youtube_url, icon: profile.social_youtube_icon_url },
        note: { url: profile.social_note_url, icon: profile.social_note_icon_url },
        zenn: { url: profile.social_zenn_url, icon: profile.social_zenn_icon_url },
        qiita: { url: profile.social_qiita_url, icon: profile.social_qiita_icon_url },
        other: { url: profile.social_other_url, icon: profile.social_other_icon_url },
      }).filter(([_, data]) => data.url && data.url.trim() !== "")
    : [];

  return (
    <div className="relative min-h-screen">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Social Icons */}
        {activeSocialLinks.length > 0 && (
          <div className="flex items-center gap-2 mb-12 md:mb-16 animate-fade-in-up opacity-0">
            {activeSocialLinks.map(([platform, data]) => {
              if (!data.url) return null;
              if (data.icon && data.icon.trim() !== "") {
                return (
                  <Link
                    key={platform}
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <Image src={data.icon} alt={platform} width={20} height={20} className="rounded-sm" />
                  </Link>
                );
              }
              if (platform === "other") return null;
              return (
                <SocialIcon
                  key={platform}
                  platform={platform as "x" | "instagram" | "tiktok" | "youtube" | "note" | "zenn" | "qiita"}
                  href={data.url}
                />
              );
            })}
          </div>
        )}

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
                    href={project.demo_url ?? "/portfolio"}
                    target={project.demo_url ? "_blank" : undefined}
                    rel={project.demo_url ? "noopener noreferrer" : undefined}
                    className="group flex-shrink-0 snap-start animate-fade-in-up opacity-0"
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

        {/* Sandbox Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">サンドボックス</h2>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/sandbox">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="relative -mx-4 px-4">
            {recentSandbox.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                まだ公開されているプロジェクトがありません
              </p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {recentSandbox.map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.demo_url ?? "/sandbox"}
                    target={item.demo_url ? "_blank" : undefined}
                    rel={item.demo_url ? "noopener noreferrer" : undefined}
                    className="group flex-shrink-0 snap-start animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden card-hover border border-border/50">
                      {item.featured_image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 60%, hsl(var(--background))), url(${item.featured_image})`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-heading font-bold text-sm md:text-base line-clamp-2">
                          {item.title}
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
                    className="group flex-shrink-0 snap-start animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
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
