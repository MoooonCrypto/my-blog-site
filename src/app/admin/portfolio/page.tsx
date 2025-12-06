"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ArrowLeft, Briefcase } from "lucide-react";

// Dummy portfolio data
const dummyPortfolio = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe.",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    status: "完成",
    thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management mobile application.",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux"],
    status: "進行中",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
  },
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState(dummyPortfolio);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("このプロジェクトを削除してもよろしいですか？")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    setEditingProject(id);
    setShowCreateForm(true);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ダッシュボードに戻る
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
                Portfolio管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                ポートフォリオプロジェクトの作成、編集、削除ができます
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingProject(null);
                setShowCreateForm(!showCreateForm);
              }}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新規作成
            </Button>
          </div>
        </header>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <Card className="mb-8 border-primary/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-heading">
                {editingProject ? "プロジェクトを編集" : "新しいプロジェクトを作成"}
              </CardTitle>
              <CardDescription>
                プロジェクトの情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" placeholder="プロジェクト名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">カテゴリー</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="mobile">モバイルアプリ</option>
                      <option value="web">Webアプリ</option>
                      <option value="tool">簡易ツール</option>
                      <option value="site">サイト</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    placeholder="プロジェクトの説明"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">サムネイルURL</Label>
                  <Input
                    id="thumbnail"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologies">技術スタック（カンマ区切り）</Label>
                  <Input
                    id="technologies"
                    placeholder="Next.js, TypeScript, Tailwind CSS"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHubリポジトリURL</Label>
                    <Input id="githubUrl" placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス</Label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="進行中">進行中</option>
                      <option value="完成">完成</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingProject ? "更新" : "作成"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingProject(null);
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold">プロジェクト一覧 ({projects.length})</h2>

          {projects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">まだプロジェクトがありません</p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  最初のプロジェクトを作成
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`card-hover border-border/50 overflow-hidden animate-fade-in-up opacity-0 delay-${Math.min(index * 100, 500)}`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${project.thumbnail})`,
                      }}
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="font-heading text-lg truncate">
                            {project.title}
                          </CardTitle>
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
                        <CardDescription className="line-clamp-2 mb-3">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(project.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
