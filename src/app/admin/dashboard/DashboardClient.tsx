"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Code2, FileText, User, TrendingUp, LogOut } from "lucide-react";

interface DashboardClientProps {
  contentSummary: {
    portfolio: number;
    sandbox: number;
    blogPosts: number;
  };
  recentActivity: Array<{
    action: string;
    time: string;
  }>;
}

export default function DashboardClient({ contentSummary, recentActivity }: DashboardClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12 animate-fade-in-up opacity-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
                管理ダッシュボード
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                コンテンツを管理し、サイトを更新します
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </Button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Portfolio</CardTitle>
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
              <Button asChild variant="ghost" size="sm" className="w-full group">
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
                <CardTitle className="font-heading text-lg">Sandbox</CardTitle>
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
              <Button asChild variant="ghost" size="sm" className="w-full group">
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
                <CardTitle className="font-heading text-lg">Blog</CardTitle>
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
              <Button asChild variant="ghost" size="sm" className="w-full group">
                <Link href="/admin/blog">
                  管理
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-400">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Profile & SNS</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">プロフィール・SNSリンク設定</p>
              <Button asChild variant="ghost" size="sm" className="w-full group">
                <Link href="/admin/profile">
                  編集
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="animate-fade-in-up opacity-0 delay-500">
          <CardHeader>
            <CardTitle className="font-heading">最近のアクティビティ</CardTitle>
            <CardDescription>あなたの最近の変更とアクション</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                まだアクティビティがありません
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
