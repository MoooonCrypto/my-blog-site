"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, User, Save, Share2 } from "lucide-react";
import type { Profile } from "@/lib/api/profile";

export default function AdminProfilePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
    email: "",
    website_url: "",
    github_url: "",
    linkedin_url: "",
    social_x_url: "",
    social_x_icon_url: "",
    social_instagram_url: "",
    social_instagram_icon_url: "",
    social_tiktok_url: "",
    social_tiktok_icon_url: "",
    social_youtube_url: "",
    social_youtube_icon_url: "",
    social_note_url: "",
    social_note_icon_url: "",
    social_zenn_url: "",
    social_zenn_icon_url: "",
    social_qiita_url: "",
    social_qiita_icon_url: "",
    social_other_url: "",
    social_other_icon_url: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/admin/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name || "",
          title: data.title || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          email: data.email || "",
          website_url: data.website_url || "",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          social_x_url: data.social_x_url || "",
          social_x_icon_url: data.social_x_icon_url || "",
          social_instagram_url: data.social_instagram_url || "",
          social_instagram_icon_url: data.social_instagram_icon_url || "",
          social_tiktok_url: data.social_tiktok_url || "",
          social_tiktok_icon_url: data.social_tiktok_icon_url || "",
          social_youtube_url: data.social_youtube_url || "",
          social_youtube_icon_url: data.social_youtube_icon_url || "",
          social_note_url: data.social_note_url || "",
          social_note_icon_url: data.social_note_icon_url || "",
          social_zenn_url: data.social_zenn_url || "",
          social_zenn_icon_url: data.social_zenn_icon_url || "",
          social_qiita_url: data.social_qiita_url || "",
          social_qiita_icon_url: data.social_qiita_icon_url || "",
          social_other_url: data.social_other_url || "",
          social_other_icon_url: data.social_other_icon_url || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // バリデーション: 氏名は必須
      if (!formData.name || formData.name.trim() === "") {
        alert("氏名は必須です");
        setIsSaving(false);
        return;
      }

      // 空文字列をnullに変換（データベースで明示的に削除するため）
      const dataToSend = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ])
      );

      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("プロフィールを保存しました");
        // ダッシュボードにリダイレクト
        router.push("/admin/dashboard");
      } else {
        const error = await response.json();
        alert(`エラー: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">読み込み中...</p>
      </div>
    );
  }

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
                  <Label htmlFor="name">
                    名前 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="山田太郎"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">役職・肩書き</Label>
                  <Input
                    id="title"
                    placeholder="Full-Stack Developer"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  placeholder="あなたについて簡単に説明してください"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
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
              <ImageUpload
                id="avatar_url"
                label="プロフィール画像"
                currentImageUrl={formData.avatar_url}
                onImageUploaded={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
                folder="avatars"
                previewClassName="w-32 h-32 rounded-full"
              />
            </CardContent>
          </Card>

          {/* SNS Links Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                <CardTitle className="font-heading">SNSリンク設定</CardTitle>
              </div>
              <CardDescription>
                ヘッダーに表示されるSNSアイコンのリンク先を設定します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* X (Twitter) */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">𝕏</span>
                  X (Twitter)
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_x_url" className="text-sm">URL</Label>
                    <Input
                      id="social_x_url"
                      placeholder="https://twitter.com/username"
                      value={formData.social_x_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_x_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_x_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_x_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">📷</span>
                  Instagram
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_instagram_url" className="text-sm">URL</Label>
                    <Input
                      id="social_instagram_url"
                      placeholder="https://instagram.com/username"
                      value={formData.social_instagram_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_instagram_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_instagram_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_instagram_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* TikTok */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">🎵</span>
                  TikTok
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_tiktok_url" className="text-sm">URL</Label>
                    <Input
                      id="social_tiktok_url"
                      placeholder="https://tiktok.com/@username"
                      value={formData.social_tiktok_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_tiktok_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_tiktok_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_tiktok_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* YouTube */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">▶️</span>
                  YouTube
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_youtube_url" className="text-sm">URL</Label>
                    <Input
                      id="social_youtube_url"
                      placeholder="https://youtube.com/@username"
                      value={formData.social_youtube_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_youtube_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_youtube_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_youtube_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* note */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">📝</span>
                  note
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_note_url" className="text-sm">URL</Label>
                    <Input
                      id="social_note_url"
                      placeholder="https://note.com/username"
                      value={formData.social_note_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_note_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_note_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_note_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* Zenn */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">📘</span>
                  Zenn
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_zenn_url" className="text-sm">URL</Label>
                    <Input
                      id="social_zenn_url"
                      placeholder="https://zenn.dev/username"
                      value={formData.social_zenn_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_zenn_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_zenn_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_zenn_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* Qiita */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">📗</span>
                  Qiita
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_qiita_url" className="text-sm">URL</Label>
                    <Input
                      id="social_qiita_url"
                      placeholder="https://qiita.com/username"
                      value={formData.social_qiita_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_qiita_icon_url"
                      label="アイコン画像 (オプション)"
                      currentImageUrl={formData.social_qiita_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_qiita_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              {/* Other */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Label className="flex items-center gap-2 font-semibold">
                  <span className="text-base">🔗</span>
                  その他
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social_other_url" className="text-sm">URL</Label>
                    <Input
                      id="social_other_url"
                      placeholder="https://example.com/yoursite"
                      value={formData.social_other_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      id="social_other_icon_url"
                      label="アイコン画像 (必須)"
                      currentImageUrl={formData.social_other_icon_url}
                      onImageUploaded={(url) => setFormData(prev => ({ ...prev, social_other_icon_url: url }))}
                      folder="sns-icons"
                      previewClassName="w-16 h-16"
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                ℹ️ URLが空欄のSNSはヘッダーに表示されません。アイコン画像URLが空欄の場合はデフォルトアイコンが使用されます。
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">その他の連絡先</CardTitle>
              <CardDescription>
                メールアドレスやその他の連絡先情報
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">ウェブサイト</Label>
                  <Input
                    id="website_url"
                    placeholder="https://example.com"
                    value={formData.website_url}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub</Label>
                  <Input
                    id="github_url"
                    placeholder="https://github.com/username"
                    value={formData.github_url}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin_url}
                    onChange={handleChange}
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
