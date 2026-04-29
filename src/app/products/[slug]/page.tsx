import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/lib/api/products";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const PLATFORM_CONFIG: Record<string, { label: string; buttonLabel: string }> = {
  ios: { label: "iOS", buttonLabel: "App Storeで見る" },
  android: { label: "Android", buttonLabel: "Google Playで見る" },
  web: { label: "Web", buttonLabel: "アプリを開く" },
  other: { label: "Other", buttonLabel: "アプリへ" },
};

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.published) notFound();

  const platformCfg = PLATFORM_CONFIG[product.platform] ?? PLATFORM_CONFIG.other;

  // プラットフォームに応じたリンク先を決定
  const appUrl =
    product.platform === "ios"
      ? product.app_store_url
      : product.platform === "android"
      ? product.play_store_url
      : product.demo_url;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6 animate-fade-in-up opacity-0">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Products
            </Link>
          </Button>
        </div>

        {/* Hero: Icon + Title + CTA */}
        <div className="flex items-center gap-6 mb-8 animate-fade-in-up opacity-0 delay-100">
          <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-lg">
            {product.icon_url ? (
              <img
                src={product.icon_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
                <span className="text-4xl font-heading font-bold text-primary/60">
                  {product.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {platformCfg.label}
              </Badge>
              {product.category && (
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
              {product.title}
            </h1>
            {appUrl && (
              <Button asChild size="sm" className="gap-2">
                <Link href={appUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {platformCfg.buttonLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Screenshots Carousel */}
        {product.screenshots.length > 0 && (
          <div className="mb-8 animate-fade-in-up opacity-0 delay-200">
            <div className="relative -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                {product.screenshots.map((ss) => (
                  <div
                    key={ss.id}
                    className="flex-shrink-0 snap-start w-48 md:w-56 rounded-2xl overflow-hidden border border-border/50 bg-muted shadow-md"
                  >
                    <img
                      src={ss.image_url}
                      alt={ss.caption ?? product.title}
                      className="w-full h-auto object-cover"
                    />
                    {ss.caption && (
                      <p className="text-xs text-muted-foreground text-center py-2 px-2">
                        {ss.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-8 animate-fade-in-up opacity-0 delay-300">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Technologies */}
        {product.technologies.length > 0 && (
          <div className="mb-8 animate-fade-in-up opacity-0 delay-300">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              使用技術
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.technologies.map((tech, i) => (
                <Badge key={i} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content (Markdown-like text) */}
        {product.content && (
          <div className="mb-8 animate-fade-in-up opacity-0 delay-400">
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm md:text-base">
              {product.content}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50 animate-fade-in-up opacity-0 delay-400">
          {appUrl && (
            <Button asChild variant="default" className="gap-2">
              <Link href={appUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {platformCfg.buttonLabel}
              </Link>
            </Button>
          )}
          {product.github_url && (
            <Button asChild variant="outline" className="gap-2">
              <Link href={product.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
