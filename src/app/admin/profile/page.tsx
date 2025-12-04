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
import { ArrowLeft, User, Save } from "lucide-react";

export default function AdminProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      alert("プロフィールを保存しました");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
              プロフィール編集
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            サイトに表示されるあなたのプロフィール情報を編集できます
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">基本情報</CardTitle>
              <CardDescription>
                あなたの基本的なプロフィール情報
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input
                    id="name"
                    placeholder="山田太郎"
                    defaultValue="Mokosau"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">役職・肩書き</Label>
                  <Input
                    id="role"
                    placeholder="Full-Stack Developer"
                    defaultValue="Full-Stack Developer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  placeholder="あなたについて簡単に説明してください"
                  rows={4}
                  defaultValue="プログラミングとデザインが好きなフルスタックエンジニアです。"
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">プロフィール画像</CardTitle>
              <CardDescription>
                サイトに表示される画像
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="avatar">画像URL</Label>
                  <Input
                    id="avatar"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    推奨サイズ: 400x400px以上
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">連絡先</CardTitle>
              <CardDescription>
                SNSやその他の連絡先情報
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">ウェブサイト</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">スキル・専門分野</CardTitle>
              <CardDescription>
                あなたの技術スタックや専門分野
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">スキル（カンマ区切り）</Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, Node.js, PostgreSQL"
                  defaultValue="React, TypeScript, Node.js, Next.js"
                />
                <p className="text-xs text-muted-foreground">
                  カンマで区切って入力してください
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">経験年数</Label>
                <Input
                  id="experience"
                  placeholder="5年"
                  defaultValue="3年"
                />
              </div>
            </CardContent>
          </Card>

          {/* Site Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">サイト設定</CardTitle>
              <CardDescription>
                サイト全体の設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">サイトタイトル</Label>
                <Input
                  id="siteTitle"
                  placeholder="MokosauBlog"
                  defaultValue="MokosauBlog"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">サイト説明</Label>
                <Textarea
                  id="siteDescription"
                  placeholder="サイトの説明を入力"
                  rows={3}
                  defaultValue="プロダクトと技術記事を発信するブログ"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/dashboard">キャンセル</Link>
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
