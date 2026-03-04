import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="card-hover border-border/50 flex flex-col overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
              >
                {/* Thumbnail */}
                {project.featured_image && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `url(${project.featured_image})`,
                      }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="font-heading text-lg flex-1">{project.title}</CardTitle>
                    {project.category && (
                      <Badge variant="outline" className="flex-shrink-0">
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

                <CardFooter className="flex gap-2">
                  {project.demo_url && (
                    <Button asChild variant="default" size="sm" className="flex-1 group">
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        アプリへ
                        <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
