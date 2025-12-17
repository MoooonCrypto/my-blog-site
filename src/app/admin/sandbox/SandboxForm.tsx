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
import type { SandboxItem } from "@/lib/api/sandbox";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SandboxFormProps {
  initialData?: SandboxItem;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  content?: string;
  status?: string;
  featured_image?: string;
  demo_url?: string;
  github_url?: string;
  technologies?: string;
  display_order?: number;
  published: boolean;
}

export default function SandboxForm({ initialData }: SandboxFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description,
          content: initialData.content || "",
          status: initialData.status || "",
          featured_image: initialData.featured_image || "",
          demo_url: initialData.demo_url || "",
          github_url: initialData.github_url || "",
          technologies: initialData.technologies?.join(", ") || "",
          display_order: initialData.display_order || 0,
          published: initialData.published || false,
        }
      : {
          title: "",
          slug: "",
          description: "",
          content: "",
          status: "実験中",
          featured_image: "",
          demo_url: "",
          github_url: "",
          technologies: "",
          display_order: 0,
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
        description: data.description.trim(),
        content: data.content?.trim() || null,
        status: data.status?.trim() || null,
        featured_image: data.featured_image?.trim() || null,
        demo_url: data.demo_url?.trim() || null,
        github_url: data.github_url?.trim() || null,
        technologies: data.technologies
          ? data.technologies.split(",").map((tech) => tech.trim()).filter(Boolean)
          : [],
        display_order: data.display_order || 0,
        published: data.published,
        published_at: data.published && !initialData?.published_at
          ? new Date().toISOString()
          : initialData?.published_at || null,
      };

      const url = initialData
        ? `/api/admin/sandbox/${initialData.id}`
        : "/api/admin/sandbox";

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
        router.push("/admin/sandbox");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Error saving sandbox item:", error);
      setError(
        error instanceof Error
          ? error.message
          : "アイテムの保存に失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-secondary/50 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="font-heading">実験プロジェクト情報</CardTitle>
        <CardDescription>
          {initialData ? "実験プロジェクトの情報を更新してください" : "実験プロジェクトの情報を入力してください"}
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
              <p className="text-sm text-primary/80 mt-1">一覧ページに移動します...</p>
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
              placeholder="実験プロジェクトのタイトルを入力"
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
              placeholder="例: my-experiment"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              URLに使用されます。例: yoursite.com/sandbox/<span className="text-primary font-mono">{watch("slug") || "slug"}</span>
            </p>
            {errors.slug && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              説明 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "説明は必須です",
                minLength: { value: 10, message: "説明は10文字以上入力してください" },
                maxLength: { value: 500, message: "説明は500文字以内で入力してください" }
              })}
              placeholder="実験の目的や内容"
              rows={3}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">ステータス</Label>
            <select
              id="status"
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={isSubmitting}
            >
              <option value="実験中">実験中</option>
              <option value="開発中">開発中</option>
              <option value="完了">完了</option>
              <option value="停止">停止</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">使用技術</Label>
            <Input
              id="technologies"
              {...register("technologies")}
              placeholder="React, WebGL, Three.js"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              カンマ（,）で区切って入力してください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo_url">デモURL</Label>
              <Input
                id="demo_url"
                {...register("demo_url")}
                placeholder="https://example.com"
                disabled={isSubmitting}
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                {...register("github_url")}
                placeholder="https://github.com/username/repo"
                disabled={isSubmitting}
                type="url"
              />
            </div>
          </div>

          <ImageUpload
            label="サムネイル画像"
            value={watch("featured_image")}
            onChange={(url) => setValue("featured_image", url)}
            folder="sandbox"
          />

          <div className="space-y-2">
            <Label htmlFor="display_order">表示順序</Label>
            <Input
              id="display_order"
              {...register("display_order", {
                valueAsNumber: true,
                min: { value: 0, message: "0以上の数値を入力してください" }
              })}
              placeholder="0"
              disabled={isSubmitting}
              type="number"
            />
            <p className="text-xs text-muted-foreground">
              数値が小さいほど先に表示されます
            </p>
            {errors.display_order && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.display_order.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">詳細説明</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="実験の詳細説明をMarkdownで記述してください..."
              rows={15}
              className="font-mono text-sm"
              disabled={isSubmitting}
            />
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
              <span className="font-medium">この実験を公開する</span>
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
