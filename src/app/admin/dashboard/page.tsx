import { getAllBlogPosts } from "@/lib/api/blog";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import { getAllSandboxItems } from "@/lib/api/sandbox";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // 【二重防御】middlewareのバックアップとして、ページレベルでも認証チェック
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // エラーがある、またはユーザーが存在しない場合は必ずログインページへ
    if (error || !user) {
      console.error("[Dashboard] Unauthorized access blocked:", error?.message || "No user");
      redirect("/admin/login");
    }
  } catch (error) {
    // 予期しない例外が発生した場合も必ず拒否
    console.error("[Dashboard] Auth check failed:", error);
    redirect("/admin/login");
  }

  const [blogPosts, portfolioItems, sandboxItems] = await Promise.all([
    getAllBlogPosts(),
    getAllPortfolioItems(),
    getAllSandboxItems(),
  ]);

  const contentSummary = {
    portfolio: portfolioItems.length,
    sandbox: sandboxItems.length,
    blogPosts: blogPosts.length,
  };

  // 最近のアクティビティを生成（作成日順に上位3件）
  const recentActivity = [
    ...blogPosts.slice(0, 1).map((post) => ({
      action: `ブログ記事「${post.title}」を${post.published ? "公開" : "作成"}`,
      time: new Date(post.created_at!).toLocaleDateString("ja-JP"),
    })),
    ...portfolioItems.slice(0, 1).map((item) => ({
      action: `ポートフォリオ「${item.title}」を${item.published ? "公開" : "作成"}`,
      time: new Date(item.created_at!).toLocaleDateString("ja-JP"),
    })),
    ...sandboxItems.slice(0, 1).map((item) => ({
      action: `Sandboxプロジェクト「${item.title}」を${item.published ? "公開" : "作成"}`,
      time: new Date(item.created_at!).toLocaleDateString("ja-JP"),
    })),
  ].slice(0, 3);

  return <DashboardClient contentSummary={contentSummary} recentActivity={recentActivity} />;
}
