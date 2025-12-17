import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPostById } from "@/lib/api/blog";
import BlogPostForm from "../../BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  let post;

  try {
    post = await getBlogPostById(params.id);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    redirect("/admin/blog");
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-8 animate-fade-in-up opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                記事一覧に戻る
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
            記事を編集
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            記事の情報を更新してください
          </p>
        </header>

        {/* Form */}
        <BlogPostForm initialData={post} />
      </div>
    </div>
  );
}
