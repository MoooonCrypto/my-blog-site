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
import { Plus, Edit, Trash2, ArrowLeft, FileText } from "lucide-react";

// Dummy blog posts data
const dummyBlogPosts = [
  {
    id: "1",
    title: "React Hooks完全ガイド",
    slug: "mastering-react-hooks",
    description: "A deep dive into useState, useEffect, and custom hooks.",
    date: "2024.01.20",
    status: "公開",
  },
  {
    id: "2",
    title: "Next.js ベストプラクティス",
    slug: "nextjs-best-practices",
    description: "Learn the best practices for building Next.js applications.",
    date: "2024.01.25",
    status: "公開",
  },
  {
    id: "3",
    title: "TypeScript実践テクニック",
    slug: "typescript-tips",
    description: "Advanced TypeScript techniques for production apps.",
    date: "2024.02.01",
    status: "下書き",
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(dummyBlogPosts);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("この記事を削除してもよろしいですか？")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    setEditingPost(id);
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
                ブログ記事管理
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                ブログ記事の作成、編集、削除ができます
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingPost(null);
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
                {editingPost ? "記事を編集" : "新しい記事を作成"}
              </CardTitle>
              <CardDescription>
                記事の情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" placeholder="記事のタイトル" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">スラッグ</Label>
                    <Input id="slug" placeholder="article-slug" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">概要</Label>
                  <Input id="description" placeholder="記事の簡単な説明" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">サムネイルURL</Label>
                  <Input
                    id="thumbnail"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">本文</Label>
                  <Textarea
                    id="content"
                    placeholder="記事の本文をMarkdownで記述"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">公開日</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス</Label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="draft">下書き</option>
                      <option value="published">公開</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingPost ? "更新" : "作成"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingPost(null);
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold">記事一覧 ({posts.length})</h2>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">まだ記事がありません</p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  最初の記事を作成
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`card-hover border-border/50 animate-fade-in-up opacity-0 delay-${Math.min(index * 100, 500)}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="font-heading text-lg truncate">
                            {post.title}
                          </CardTitle>
                          <span
                            className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                              post.status === "公開"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {post.status}
                          </span>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>スラッグ: {post.slug}</span>
                          <span>公開日: {post.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          onClick={() => handleEdit(post.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(post.id)}
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
