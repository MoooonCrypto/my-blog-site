import Link from "next/link";
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
  },
  {
    id: "2",
    title: "AI-Powered Image Recognition",
    description: "A proof-of-concept for an AI model that identifies objects in images.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
  },
];

export default function SandboxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">My Sandbox</h1>
        <p className="text-lg text-muted-foreground mt-2">A space for my experimental and in-progress projects.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummySandboxProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-secondary text-secondary-foreground text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/sandbox/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
