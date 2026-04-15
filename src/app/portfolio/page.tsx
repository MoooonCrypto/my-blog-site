import { Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPublishedPortfolioItems } from "@/lib/api/portfolio";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getPublishedPortfolioItems();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center animate-fade-in-up opacity-0">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            プロダクト
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            プロダクト、アプリ、ツールなどのポートフォリオ
          </p>
        </header>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">まだ公開されているプロジェクトがありません</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="relative card-hover border-border/50 flex flex-col overflow-hidden animate-fade-in-up opacity-0 max-w-sm w-full mx-auto"
                style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
              >
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`${project.title} を開く`}
                  />
                )}

                {/* Thumbnail */}
                {project.featured_image && (
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `url(${project.featured_image})`,
                      }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <CardTitle className="font-heading text-base flex-1">{project.title}</CardTitle>
                    {project.category && (
                      <Badge variant="outline" className="flex-shrink-0 text-xs">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>

                {project.github_url && (
                  <div className="px-6 pb-6">
                    <Button asChild variant="outline" size="sm" className="relative z-20">
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} のGitHub`}
                      >
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
