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

const dummyProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["React", "Firebase", "Material-UI"],
  },
  {
    id: "3",
    title: "Data Visualization Dashboard",
    description: "A dashboard for visualizing complex datasets using D3.js.",
    technologies: ["React", "D3.js", "Express", "Node.js"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">My Portfolio</h1>
        <p className="text-lg text-muted-foreground mt-2">A collection of my professional and personal projects.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyProjects.map((project) => (
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
                <Link href={`/portfolio/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
