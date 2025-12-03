import Link from "next/link";
import { ArrowRight, Briefcase, Code2, FileText } from "lucide-react";
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
    icon: Briefcase,
  },
  {
    id: "2",
    title: "Real-time Chat App",
    description: "A chat application using WebSockets for instant messaging.",
    type: "sandbox",
    icon: Code2,
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
    <div className="relative">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-20">
        {/* Hero section with staggered animations */}
        <section className="text-center mb-24 space-y-6">
          <div className="animate-fade-in-up opacity-0">
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Full-Stack Developer &<br />Tech Enthusiast
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 delay-100">
            Welcome to my digital space. Here I showcase my projects, share my thoughts on technology, and document my learning journey.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up opacity-0 delay-200">
            <Button asChild size="lg" className="group">
              <Link href="/portfolio">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/profile">About Me</Link>
            </Button>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 animate-fade-in-up opacity-0 delay-300">
            <div className="h-px bg-border flex-1" />
            <h2 className="text-3xl font-heading font-bold">最近のプロジェクト</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.id}
                  className={`card-hover border-border/50 animate-fade-in-up opacity-0 delay-${400 + index * 100}`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-heading">{project.title}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="ghost" className="group">
                      <Link href={`/${project.type}/${project.id}`}>
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/portfolio">すべてのプロジェクトを見る</Link>
            </Button>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px bg-border flex-1" />
            <h2 className="text-3xl font-heading font-bold">最新のブログ記事</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentPosts.map((post, index) => (
              <Card
                key={post.slug}
                className={`card-hover border-border/50 animate-fade-in-up opacity-0 delay-${600 + index * 100}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading">{post.title}</CardTitle>
                      <CardDescription className="mt-2">{post.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" className="group">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/blog">すべての記事を見る</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
