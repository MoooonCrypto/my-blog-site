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
import { Plus, Edit, Trash2, ArrowLeft, Code2 } from "lucide-react";

// Dummy sandbox data
const dummySandbox = [
  {
    id: "1",
    title: "Real-time Chat App",
    description: "An experimental chat application using WebSockets.",
    technologies: ["Node.js", "Socket.IO", "React"],
    status: "実験中",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "AI-Powered Image Recognition",
    description: "A proof-of-concept for an AI model.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    status: "開発中",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
  },
];

export default function AdminSandboxPage() {
  const [experiments, setExperiments] = useState(dummySandbox);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingExperiment, setEditingExperiment] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("この実験を削除してもよろしいですか？")) {
      setExperiments(experiments.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    setEditingExperiment(id);
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
                Sandbox管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                実験プロジェクトの作成、編集、削除ができます
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingExperiment(null);
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
          <Card className="mb-8 border-secondary/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-heading">
                {editingExperiment ? "実験を編集" : "新しい実験を作成"}
              </CardTitle>
              <CardDescription>
                実験プロジェクトの情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" placeholder="実験プロジェクト名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス</Label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="実験中">実験中</option>
                      <option value="開発中">開発中</option>
                      <option value="完了">完了</option>
                      <option value="停止">停止</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    placeholder="実験の目的や内容"
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
                  <Label htmlFor="technologies">使用技術（カンマ区切り）</Label>
                  <Input
                    id="technologies"
                    placeholder="React, WebGL, Three.js"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">デモURL（任意）</Label>
                  <Input id="demoUrl" placeholder="https://demo.example.com" />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingExperiment ? "更新" : "作成"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingExperiment(null);
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Experiments List */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold">実験一覧 ({experiments.length})</h2>

          {experiments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">まだ実験がありません</p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  最初の実験を作成
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {experiments.map((experiment, index) => (
                <Card
                  key={experiment.id}
                  className={`card-hover border-border/50 overflow-hidden animate-fade-in-up opacity-0 delay-${Math.min(index * 100, 500)}`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${experiment.thumbnail})`,
                      }}
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="font-heading text-lg truncate">
                            {experiment.title}
                          </CardTitle>
                          <span className="text-xs px-2 py-1 rounded-full flex-shrink-0 bg-secondary/10 text-secondary">
                            {experiment.status}
                          </span>
                        </div>
                        <CardDescription className="line-clamp-2 mb-3">
                          {experiment.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1">
                          {experiment.technologies.map((tech) => (
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
                        onClick={() => handleEdit(experiment.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </Button>
                      <Button
                        onClick={() => handleDelete(experiment.id)}
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
