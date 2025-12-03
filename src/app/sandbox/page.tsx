import Link from "next/link";
import { Code2, ExternalLink, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummySandboxProjects = [
  {
    id: "1",
    title: "Real-time Chat App",
    description: "An experimental chat application using WebSockets.",
    technologies: ["Node.js", "Socket.IO", "React"],
    status: "実験中",
  },
  {
    id: "2",
    title: "AI-Powered Image Recognition",
    description: "A proof-of-concept for an AI model that identifies objects in images.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    status: "開発中",
  },
  {
    id: "3",
    title: "3D Interactive Portfolio",
    description: "Experimenting with Three.js for immersive web experiences.",
    technologies: ["Three.js", "React", "WebGL"],
    status: "実験中",
  },
];

export default function SandboxPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center animate-fade-in-up opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Sandbox</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
            実験サンドボックス
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A space for my experimental and in-progress projects where I explore new technologies and ideas.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummySandboxProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`card-hover border-border/50 flex flex-col animate-fade-in-up opacity-0 delay-${100 + index * 100}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="font-heading">{project.title}</CardTitle>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
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
              <CardFooter>
                <Button asChild variant="default" className="w-full group">
                  <Link href={`/sandbox/${project.id}`}>
                    View Experiment
                    <Code2 className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 glass-effect rounded-lg text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">新しいアイデアがありますか？</h2>
          <p className="text-muted-foreground mb-6">
            このサンドボックスは常に進化しています。新しい実験を定期的に追加しています。
          </p>
          <Button asChild variant="outline">
            <Link href="/profile">お問い合わせ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
