import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPortfolioItemById } from "@/lib/api/portfolio";
import { ExternalLink, Github, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let project;

  try {
    project = await getPortfolioItemById(params.id);
  } catch (error) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 animate-fade-in-up opacity-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <span>/</span>
              <Link
                href="/portfolio"
                className="hover:text-foreground transition-colors"
              >
                ポートフォリオ
              </Link>
              <span>/</span>
              <span>{project.title}</span>
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                {project.title}
              </h1>
              {project.category && (
                <Badge variant="outline" className="flex-shrink-0">
                  {project.category}
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-4">
              {project.description}
            </p>

            {project.published_at && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(project.published_at).toLocaleDateString("ja-JP")}
                </time>
              </div>
            )}
          </header>

          {/* Thumbnail */}
          {project.featured_image && (
            <div className="mb-8 animate-fade-in-up opacity-0 delay-100">
              <div
                className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-border/50"
                style={{
                  backgroundImage: `url(${project.featured_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          )}

          {/* Content */}
          {project.content && (
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-8 animate-fade-in-up opacity-0 delay-200"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8 animate-fade-in-up opacity-0 delay-300">
              <h3 className="text-xl font-heading font-bold mb-4">
                使用技術
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up opacity-0 delay-400">
            {project.demo_url && (
              <Button asChild size="lg">
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  デモを見る
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHubで見る
                </a>
              </Button>
            )}
          </div>

          {/* Back to Portfolio */}
          <div className="mt-12 pt-8 border-t animate-fade-in-up opacity-0 delay-500">
            <Button variant="ghost" asChild>
              <Link href="/portfolio">← ポートフォリオ一覧に戻る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
