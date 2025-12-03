"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Code2, FileText, Settings, TrendingUp, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Dummy data for the dashboard
const contentSummary = {
  portfolio: 3,
  sandbox: 2,
  blogPosts: 3,
};

const recentActivity = [
  { action: "Portfolio project 'E-commerce Platform' を更新", time: "2時間前" },
  { action: "新しいブログ記事 'React Hooks' を公開", time: "1日前" },
  { action: "Sandbox project 'Chat App' を追加", time: "3日前" },
];

export default function AdminDashboardPage() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 animate-fade-in-up opacity-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">
                管理ダッシュボード
              </h1>
              <p className="text-lg text-muted-foreground">
                コンテンツを管理し、サイトを更新します
              </p>
            </div>
            <Button
              onClick={() => setShowNewProjectForm(!showNewProjectForm)}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新規作成
            </Button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">Portfolio</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading mb-2">
                {contentSummary.portfolio}
              </div>
              <p className="text-sm text-muted-foreground mb-4">プロジェクト</p>
              <Button asChild variant="ghost" className="w-full group">
                <Link href="/admin/portfolio">
                  管理
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">Sandbox</CardTitle>
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Code2 className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading mb-2">
                {contentSummary.sandbox}
              </div>
              <p className="text-sm text-muted-foreground mb-4">実験プロジェクト</p>
              <Button asChild variant="ghost" className="w-full group">
                <Link href="/admin/sandbox">
                  管理
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">Blog</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading mb-2">
                {contentSummary.blogPosts}
              </div>
              <p className="text-sm text-muted-foreground mb-4">公開記事</p>
              <Button asChild variant="ghost" className="w-full group">
                <Link href="/admin/blog">
                  管理
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Create Form */}
        {showNewProjectForm && (
          <Card className="mb-12 border-primary/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-heading">新規プロジェクトを作成</CardTitle>
              <CardDescription>
                新しいポートフォリオプロジェクトまたはサンドボックス実験を追加
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input id="title" placeholder="プロジェクト名を入力" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">タイプ</Label>
                    <select
                      id="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="portfolio">Portfolio</option>
                      <option value="sandbox">Sandbox</option>
                      <option value="blog">Blog Post</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    placeholder="プロジェクトの説明を入力"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">作成</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewProjectForm(false)}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="animate-fade-in-up opacity-0 delay-400">
          <CardHeader>
            <CardTitle className="font-heading">最近のアクティビティ</CardTitle>
            <CardDescription>あなたの最近の変更とアクション</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Settings className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
