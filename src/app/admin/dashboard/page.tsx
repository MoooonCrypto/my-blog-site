import { getAllBlogPosts } from "@/lib/api/blog";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import { getAllSandboxItems } from "@/lib/api/sandbox";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // 【二重防御】middlewareのバックアップとして、ページレベルでも認証チェック
  // redirect()はNext.js内部でNEXT_REDIRECTをthrowするため、try/catchの外で呼ぶ
  let authenticated = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      authenticated = true;
    }
  } catch {
    // 認証チェック失敗時はfalseのまま
  }

  if (!authenticated) {
    redirect("/admin/login");
  }

  const [blogPosts, portfolioItems, sandboxItems] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllPortfolioItems().catch(() => []),
    getAllSandboxItems().catch(() => []),
  ]);

  const contentSummary = {
    portfolio: portfolioItems.length,
    sandbox: sandboxItems.length,
    blogPosts: blogPosts.length,
  };

  const recentActivity = [
    ...blogPosts.slice(0, 1).map((post) => ({
      action: `ブログ記事「${post.title}」を${post.published ? "公開" : "作成"}`,
      time: post.created_at ? new Date(post.created_at).toLocaleDateString("ja-JP") : "日付不明",
    })),
    ...portfolioItems.slice(0, 1).map((item) => ({
      action: `ポートフォリオ「${item.title}」を${item.published ? "公開" : "作成"}`,
      time: item.created_at ? new Date(item.created_at).toLocaleDateString("ja-JP") : "日付不明",
    })),
    ...sandboxItems.slice(0, 1).map((item) => ({
      action: `Sandboxプロジェクト「${item.title}」を${item.published ? "公開" : "作成"}`,
      time: item.created_at ? new Date(item.created_at).toLocaleDateString("ja-JP") : "日付不明",
    })),
  ].slice(0, 3);

  return <DashboardClient contentSummary={contentSummary} recentActivity={recentActivity} />;
}
