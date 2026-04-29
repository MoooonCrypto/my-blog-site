"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { AlertCircle, CheckCircle2, Plus, X, Loader2 } from "lucide-react";
import type { ProductWithScreenshots } from "@/lib/api/products";

interface ProductFormProps {
  initialData?: ProductWithScreenshots;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  content?: string;
  icon_url?: string;
  platform: "ios" | "android" | "web" | "other";
  app_store_url?: string;
  play_store_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies?: string;
  category?: string;
  display_order?: number;
  published: boolean;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [screenshots, setScreenshots] = useState(
    initialData?.screenshots ?? []
  );
  const [ssUploading, setSsUploading] = useState(false);
  const [newSsCaption, setNewSsCaption] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description,
          content: initialData.content ?? "",
          icon_url: initialData.icon_url ?? "",
          platform: initialData.platform,
          app_store_url: initialData.app_store_url ?? "",
          play_store_url: initialData.play_store_url ?? "",
          demo_url: initialData.demo_url ?? "",
          github_url: initialData.github_url ?? "",
          technologies: initialData.technologies?.join(", ") ?? "",
          category: initialData.category ?? "",
          display_order: initialData.display_order ?? 0,
          published: initialData.published ?? false,
        }
      : {
          title: "", slug: "", description: "", content: "", icon_url: "",
          platform: "web", app_store_url: "", play_store_url: "", demo_url: "",
          github_url: "", technologies: "", category: "", display_order: 0, published: false,
        },
  });

  const platform = watch("platform");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        title: data.title.trim(),
        slug: data.slug.trim(),
        description: data.description.trim(),
        content: data.content?.trim() || null,
        icon_url: data.icon_url?.trim() || null,
        platform: data.platform,
        app_store_url: data.app_store_url?.trim() || null,
        play_store_url: data.play_store_url?.trim() || null,
        demo_url: data.demo_url?.trim() || null,
        github_url: data.github_url?.trim() || null,
        technologies: data.technologies
          ? data.technologies.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        category: data.category?.trim() || null,
        display_order: data.display_order ?? 0,
        published: data.published,
        published_at: data.published && !initialData?.published_at
          ? new Date().toISOString()
          : initialData?.published_at ?? null,
      };

      const url = initialData
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || `サーバーエラー: ${res.status}`);

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddScreenshot = async (url: string) => {
    if (!initialData?.id) return;
    setSsUploading(true);
    try {
      const res = await fetch(`/api/admin/products/${initialData.id}/screenshots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: url,
          caption: newSsCaption || null,
          display_order: screenshots.length,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setScreenshots((prev) => [...prev, data]);
        setNewSsCaption("");
      }
    } finally {
      setSsUploading(false);
    }
  };

  const handleDeleteScreenshot = async (id: string) => {
    if (!initialData?.id) return;
    await fetch(`/api/admin/products/${initialData.id}/screenshots`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ screenshot_id: id }),
    });
    setScreenshots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Card className="border-primary/50 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="font-heading">プロダクト情報</CardTitle>
        <CardDescription>
          {initialData ? "プロダクトの情報を更新してください" : "プロダクトの情報を入力してください"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">エラーが発生しました</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">保存しました！</p>
              <p className="text-sm text-primary/80 mt-1">一覧ページに移動します...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">タイトル <span className="text-destructive">*</span></Label>
            <Input id="title" {...register("title", { required: "タイトルは必須です" })} placeholder="アプリ名" disabled={isSubmitting} />
            {errors.title && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">スラッグ <span className="text-destructive">*</span></Label>
            <Input id="slug" {...register("slug", { required: "スラッグは必須です" })} placeholder="my-awesome-app" disabled={isSubmitting} />
            {errors.slug && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.slug.message}</p>}
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label htmlFor="platform">プラットフォーム <span className="text-destructive">*</span></Label>
            <select
              id="platform"
              {...register("platform")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={isSubmitting}
            >
              <option value="ios">iOS</option>
              <option value="android">Android</option>
              <option value="web">Web</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* App Icon */}
          <ImageUpload
            label="アプリアイコン（正方形推奨）"
            value={watch("icon_url")}
            onChange={(url) => setValue("icon_url", url)}
            folder="icons"
          />

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">説明 <span className="text-destructive">*</span></Label>
            <Textarea id="description" {...register("description", { required: "説明は必須です" })} placeholder="プロダクトの簡単な説明" rows={3} disabled={isSubmitting} />
            {errors.description && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.description.message}</p>}
          </div>

          {/* URLs */}
          {(platform === "ios" || platform === "other") && (
            <div className="space-y-2">
              <Label htmlFor="app_store_url">App Store URL</Label>
              <Input id="app_store_url" {...register("app_store_url")} placeholder="https://apps.apple.com/..." type="url" disabled={isSubmitting} />
            </div>
          )}
          {platform === "android" && (
            <div className="space-y-2">
              <Label htmlFor="play_store_url">Google Play URL</Label>
              <Input id="play_store_url" {...register("play_store_url")} placeholder="https://play.google.com/..." type="url" disabled={isSubmitting} />
            </div>
          )}
          {(platform === "web" || platform === "other") && (
            <div className="space-y-2">
              <Label htmlFor="demo_url">アプリURL</Label>
              <Input id="demo_url" {...register("demo_url")} placeholder="https://example.com" type="url" disabled={isSubmitting} />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input id="github_url" {...register("github_url")} placeholder="https://github.com/username/repo" type="url" disabled={isSubmitting} />
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">使用技術</Label>
            <Input id="technologies" {...register("technologies")} placeholder="React, Swift, TypeScript" disabled={isSubmitting} />
            <p className="text-xs text-muted-foreground">カンマ（,）で区切って入力</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">カテゴリー</Label>
              <Input id="category" {...register("category")} placeholder="SNS, ツール, ゲーム..." disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_order">表示順序</Label>
              <Input id="display_order" {...register("display_order", { valueAsNumber: true })} type="number" placeholder="0" disabled={isSubmitting} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">詳細説明（任意）</Label>
            <Textarea id="content" {...register("content")} placeholder="プロダクトの詳細説明..." rows={8} className="font-mono text-sm" disabled={isSubmitting} />
          </div>

          {/* Screenshots - 編集時のみ表示 */}
          {initialData && (
            <div className="space-y-4 p-4 border rounded-lg">
              <Label className="text-base font-semibold">スクリーンショット</Label>
              {screenshots.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {screenshots.map((ss) => (
                    <div key={ss.id} className="flex-shrink-0 relative group w-32">
                      <img src={ss.image_url} alt={ss.caption ?? ""} className="w-32 h-48 object-cover rounded-lg border border-border" />
                      <button
                        type="button"
                        onClick={() => handleDeleteScreenshot(ss.id)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {ss.caption && <p className="text-xs text-center mt-1 text-muted-foreground">{ss.caption}</p>}
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <Input
                  placeholder="キャプション（任意）"
                  value={newSsCaption}
                  onChange={(e) => setNewSsCaption(e.target.value)}
                  disabled={ssUploading}
                />
                <ImageUpload
                  label="スクリーンショットを追加"
                  value=""
                  onChange={handleAddScreenshot}
                  folder="screenshots"
                />
              </div>
              {ssUploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />追加中...
                </div>
              )}
            </div>
          )}
          {!initialData && (
            <p className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
              スクリーンショットはプロダクト作成後に追加できます
            </p>
          )}

          {/* Published */}
          <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
            <input type="checkbox" id="published" {...register("published")} className="h-4 w-4 rounded border-input" disabled={isSubmitting} />
            <Label htmlFor="published" className="cursor-pointer flex-1">
              <span className="font-medium">このプロダクトを公開する</span>
              <p className="text-xs text-muted-foreground mt-1">チェックを入れると、サイトに公開されます</p>
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting || success}>
              {isSubmitting ? "保存中..." : success ? "保存完了" : initialData ? "更新する" : "作成する"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
