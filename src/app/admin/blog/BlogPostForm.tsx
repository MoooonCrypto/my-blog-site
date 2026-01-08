"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import ImageUpload from "@/components/admin/ImageUpload";
import type { BlogPost } from "@/lib/api/blog";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface BlogPostFormProps {
  initialData?: BlogPost;
}

interface FormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  tags?: string;
  published: boolean;
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          content: initialData.content,
          excerpt: initialData.excerpt || "",
          featured_image: initialData.featured_image || "",
          tags: initialData.tags?.join(", ") || "",
          published: initialData.published || false,
        }
      : {
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          featured_image: "",
          tags: "",
          published: false,
        },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // スラッグのバリデーション
      if (!data.slug || data.slug.trim() === "") {
        throw new Error("スラッグは必須です");
      }

      const payload = {
        title: data.title.trim(),
        slug: data.slug.trim(),
        content: data.content.trim(),
        excerpt: data.excerpt?.trim() || null,
        featured_image: data.featured_image?.trim() || null,
        tags: data.tags
          ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : [],
        published: data.published,
        published_at: data.published && !initialData?.published_at
          ? new Date().toISOString()
          : initialData?.published_at || null,
      };

      const url = initialData
        ? `/api/admin/blog/${initialData.id}`
        : "/api/admin/blog";

      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `サーバーエラー: ${response.status}`);
      }

      setSuccess(true);

      // 成功後、一覧ページに遷移
      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Error saving blog post:", error);
      setError(
        error instanceof Error
          ? error.message
          : "記事の保存に失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/50 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="font-heading">記事情報</CardTitle>
        <CardDescription>
          {initialData ? "記事の情報を更新してください" : "記事の情報を入力してください"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-destructive">エラーが発生しました</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-primary">保存しました！</p>
              <p className="text-sm text-primary/80 mt-1">記事一覧ページに移動します...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              タイトル <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              {...register("title", {
                required: "タイトルは必須です",
                minLength: { value: 1, message: "タイトルを入力してください" },
                maxLength: { value: 200, message: "タイトルは200文字以内で入力してください" }
              })}
              placeholder="記事のタイトルを入力"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              スラッグ（URL用） <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              {...register("slug", {
                required: "スラッグは必須です",
                pattern: {
                  value: /^[a-z0-9\-_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                  message: "英数字、ハイフン、アンダースコア、日本語のみ使用できます"
                },
                maxLength: { value: 100, message: "スラッグは100文字以内で入力してください" }
              })}
              placeholder="例: my-first-post"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              URLに使用されます。例: yoursite.com/blog/<span className="text-primary font-mono">{watch("slug") || "slug"}</span>
            </p>
            {errors.slug && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">概要</Label>
            <Input
              id="excerpt"
              {...register("excerpt", {
                maxLength: { value: 300, message: "概要は300文字以内で入力してください" }
              })}
              placeholder="記事の簡単な説明（任意、一覧ページで表示されます）"
              disabled={isSubmitting}
            />
            {errors.excerpt && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.excerpt.message}
              </p>
            )}
          </div>

          <ImageUpload
            label="サムネイル画像（任意）"
            value={watch("featured_image")}
            onChange={(url) => setValue("featured_image", url)}
            folder="blog"
          />

          <div className="space-y-2">
            <Label htmlFor="tags">タグ</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="React, Next.js, TypeScript"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              カンマ（,）で区切って入力してください
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              本文 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              {...register("content", {
                required: "本文は必須です",
                minLength: { value: 10, message: "本文は10文字以上入力してください" }
              })}
              placeholder="記事の本文を入力してください（改行はそのまま反映されます）..."
              rows={20}
              className="font-mono text-sm"
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="published"
              {...register("published")}
              className="h-4 w-4 rounded border-input"
              disabled={isSubmitting}
            />
            <Label htmlFor="published" className="cursor-pointer flex-1">
              <span className="font-medium">この記事を公開する</span>
              <p className="text-xs text-muted-foreground mt-1">
                チェックを入れると、サイトに公開されます
              </p>
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting || success}>
              {isSubmitting
                ? "保存中..."
                : success
                ? "保存完了"
                : initialData
                ? "更新する"
                : "作成する"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
