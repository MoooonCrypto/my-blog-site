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

// Dummy data
const recentProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with Next.js and Stripe.",
    type: "portfolio",
  },
  {
    id: "2",
    title: "Real-time Chat App",
    description: "A chat application using WebSockets for instant messaging.",
    type: "sandbox",
  },
];

const recentPosts = [
  {
    slug: "hello-world",
    title: "Hello World: My First Blog Post",
    description: "An introduction to my new blog and what to expect.",
  },
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks",
    description: "A deep dive into useState, useEffect, and custom hooks.",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Full-Stack Developer & Tech Enthusiast
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Welcome to my digital space. Here I showcase my projects, share my thoughts on technology, and document my learning journey.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {recentProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/${project.type}/${project.id}`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
