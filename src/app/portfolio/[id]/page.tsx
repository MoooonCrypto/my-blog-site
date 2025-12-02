import Link from "next/link";
import { Button } from "@/components/ui/button";

// This is a placeholder. In a real app, you'd fetch this data based on the `params.id`.
const dummyProject = {
  id: "1",
  title: "E-commerce Platform",
  description: "A comprehensive e-commerce solution designed for scalability and performance. It features a fully responsive design, secure payment processing with Stripe, and a complete admin dashboard for managing products, orders, and customers.",
  technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
  project_url: "https://example.com",
  github_url: "https://github.com/example/ecommerce",
  // In a real app, you might have more detailed content, like markdown or images.
  long_description: "<p>The project was built from the ground up to be a modern, fast, and reliable online store...</p>",
};

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  // You can use params.id to fetch the specific project data
  const project = dummyProject;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </header>

        <div className="mb-8">
          <img
            src="https://via.placeholder.com/1200x600" // Placeholder image
            alt={project.title}
            className="w-full h-auto rounded-lg border"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.long_description }} />

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-secondary text-secondary-foreground text-sm font-semibold mr-2 px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {project.project_url && (
            <Button asChild>
              <Link href={project.project_url} target="_blank" rel="noopener noreferrer">
                Visit Project
              </Link>
            </Button>
          )}
          {project.github_url && (
            <Button variant="secondary" asChild>
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
