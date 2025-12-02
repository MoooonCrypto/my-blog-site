import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyPosts = [
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks",
    description: "A deep dive into useState, useEffect, and custom hooks for cleaner, more maintainable React components.",
    date: "November 20, 2025",
  },
  {
    slug: "nextjs-app-router-explained",
    title: "Next.js App Router Explained",
    description: "Understanding the new App Router in Next.js 13+, including layouts, server components, and data fetching strategies.",
    date: "November 15, 2025",
  },
  {
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS Best Practices",
    description: "Tips and tricks for writing scalable and maintainable CSS with Tailwind.",
    date: "November 10, 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">My Blog</h1>
        <p className="text-lg text-muted-foreground mt-2">Thoughts on technology, development, and everything in between.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <CardHeader>
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild>
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
