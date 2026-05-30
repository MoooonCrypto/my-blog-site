"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { ArrowLeft, User, Save, Plus, Trash2 } from "lucide-react";

const PLATFORM_OPTIONS = ["x", "instagram", "tiktok", "youtube", "note", "zenn", "qiita", "other"];
const MAX_HEADER_ICONS = 5;

interface SocialLinkForm {
  platform: string;
  title: string;
  url: string;
  icon_url: string;
  show_in_header: boolean;
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", title: "", bio: "", avatar_url: "",
    email: "", website_url: "", github_url: "", linkedin_url: "",
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinkForm[]>([]);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setFormData({
            name: data.name ?? "",
            title: data.title ?? "",
            bio: data.bio ?? "",
            avatar_url: data.avatar_url ?? "",
            email: data.email ?? "",
            website_url: data.website_url ?? "",
            github_url: data.github_url ?? "",
            linkedin_url: data.linkedin_url ?? "",
          });
          setSocialLinks(
            (data.social_links ?? []).map((l: any) => ({
              platform: l.platform,
              title: l.title ?? "",
              url: l.url,
              icon_url: l.icon_url ?? "",
              show_in_header: l.show_in_header ?? false,
            }))
          );
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { platform: "other", title: "", url: "", icon_url: "", show_in_header: false }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: keyof SocialLinkForm, value: string | boolean) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert("名前は必須です"); return; }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          social_links: socialLinks
            .filter((l) => l.url.trim() !== "")
            .map((l, i) => ({ ...l, display_order: i, icon_url: l.icon_url || null })),
        }),
      });
      if (res.ok) {
        alert("プロフィールを保存しました");
        router.push("/admin/dashboard");
      } else {
        const err = await res.json();
        alert(`エラー: ${err.error}`);
      }
    } catch {
      alert("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const headerCount = socialLinks.filter((l) => l.show_in_header && l.url.trim() !== "").length;

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8"><p className="text-center">読み込み中...</p></div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard"><ArrowLeft className="h-4 w-4 mr-2" />ダッシュボード</Link>
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary"><User className="h-6 w-6" /></div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">プロフィール編集</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">名前 <span className="text-destructive">*</span></Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="山田太郎" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">役職・肩書き</Label>
                  <Input id="title" value={formData.title} onChange={handleChange} placeholder="Full-Stack Developer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea id="bio" value={formData.bio} onChange={handleChange} rows={4} placeholder="あなたについて簡単に説明してください" />
              </div>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">プロフィール画像</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                label="プロフィール画像"
                value={formData.avatar_url}
                onChange={(url) => setFormData((prev) => ({ ...prev, avatar_url: url }))}
                folder="avatars"
              />
            </CardContent>
          </Card>

          {/* SNS Links */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">SNSリンク</CardTitle>
                <span className={`text-sm font-medium tabular-nums ${headerCount >= MAX_HEADER_ICONS ? "text-primary" : "text-muted-foreground"}`}>
                  {headerCount} / {MAX_HEADER_ICONS} をヘッダーに表示
                </span>
              </div>
              <CardDescription>
                ヘッダーに表示するSNSアイコンを最大{MAX_HEADER_ICONS}個選択できます。サイドメニューのMediaには全リンクが表示されます。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialLinks.map((link, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <select
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm capitalize"
                    >
                      {PLATFORM_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-3">
                      {/* show_in_header toggle */}
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={link.show_in_header}
                          disabled={!link.show_in_header && headerCount >= MAX_HEADER_ICONS}
                          onChange={(e) => updateSocialLink(index, "show_in_header", e.target.checked)}
                          className="h-4 w-4 rounded border-input accent-primary disabled:cursor-not-allowed"
                        />
                        <span className={`text-xs font-medium ${!link.show_in_header && headerCount >= MAX_HEADER_ICONS ? "text-muted-foreground/50" : "text-muted-foreground"}`}>
                          ヘッダーに表示
                        </span>
                      </label>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">
                      表示名
                      <span className="ml-1 text-muted-foreground font-normal">（Mediaメニューに表示。空欄ならプラットフォーム名を使用）</span>
                    </Label>
                    <Input
                      value={link.title}
                      onChange={(e) => updateSocialLink(index, "title", e.target.value)}
                      placeholder="例: X (Twitter)、個人ブログ など"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">URL</Label>
                    <Input value={link.url} onChange={(e) => updateSocialLink(index, "url", e.target.value)} placeholder="https://..." />
                  </div>
                  <ImageUpload
                    label="アイコン画像（オプション）"
                    value={link.icon_url}
                    onChange={(url) => updateSocialLink(index, "icon_url", url)}
                    folder="sns-icons"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSocialLink} className="w-full gap-2">
                <Plus className="h-4 w-4" />SNSリンクを追加
              </Button>
              <p className="text-xs text-muted-foreground">URLが空欄のSNSは保存されません</p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading">連絡先</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">ウェブサイト</Label>
                  <Input id="website_url" value={formData.website_url} onChange={handleChange} placeholder="https://example.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub</Label>
                  <Input id="github_url" value={formData.github_url} onChange={handleChange} placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input id="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/dashboard">キャンセル</Link>
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />{isSaving ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
