"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, ExternalLink, Github, Smartphone, Globe, Wrench, Layout } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "all" | "mobile" | "web" | "tool" | "site";

const categories = [
  { id: "all" as Category, label: "すべて", icon: Layout },
  { id: "mobile" as Category, label: "モバイルアプリ", icon: Smartphone },
  { id: "web" as Category, label: "Webアプリ", icon: Globe },
  { id: "tool" as Category, label: "簡易ツール", icon: Wrench },
  { id: "site" as Category, label: "サイト", icon: Briefcase },
];

const dummyProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    category: "web" as Category,
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management mobile application with real-time updates.",
    technologies: ["React Native", "Firebase", "Redux"],
    category: "mobile" as Category,
    status: "進行中",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Data Visualization Dashboard",
    description: "A dashboard for visualizing complex datasets using D3.js.",
    technologies: ["React", "D3.js", "Express", "Node.js"],
    category: "web" as Category,
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Image Converter Tool",
    description: "A simple browser-based image format converter.",
    technologies: ["HTML", "JavaScript", "Canvas API"],
    category: "tool" as Category,
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing creative work.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "site" as Category,
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Fitness Tracker App",
    description: "Mobile app for tracking workouts and nutrition.",
    technologies: ["Flutter", "Dart", "SQLite"],
    category: "mobile" as Category,
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? dummyProjects
      : dummyProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center animate-fade-in-up opacity-0">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            Portfolio
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            プロダクト、アプリ、ツールなどのポートフォリオ
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap snap-start flex-shrink-0",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card hover:bg-muted border border-border/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`card-hover border-border/50 flex flex-col overflow-hidden animate-fade-in-up opacity-0 delay-${Math.min(index * 100, 500)}`}
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                  }}
                />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="font-heading text-lg">{project.title}</CardTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      project.status === "完成"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2.5 py-1">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button asChild variant="default" size="sm" className="flex-1 group">
                  <Link href={`/portfolio/${project.id}`}>
                    詳細
                    <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="#" className="flex items-center gap-1">
                    <Github className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">このカテゴリーにはプロジェクトがありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
