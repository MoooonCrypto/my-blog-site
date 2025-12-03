import Link from "next/link";
import { Briefcase, ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    status: "完成",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["React", "Firebase", "Material-UI"],
    status: "進行中",
  },
  {
    id: "3",
    title: "Data Visualization Dashboard",
    description: "A dashboard for visualizing complex datasets using D3.js.",
    technologies: ["React", "D3.js", "Express", "Node.js"],
    status: "完成",
  },
];

export default function PortfolioPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center animate-fade-in-up opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
            プロジェクトポートフォリオ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my professional and personal projects showcasing my skills in full-stack development.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`card-hover border-border/50 flex flex-col animate-fade-in-up opacity-0 delay-${100 + index * 100}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="font-heading">{project.title}</CardTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "完成"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild variant="default" className="flex-1 group">
                  <Link href={`/portfolio/${project.id}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link href="#">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
