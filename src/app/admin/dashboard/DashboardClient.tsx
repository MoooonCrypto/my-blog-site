"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, User, TrendingUp, LogOut } from "lucide-react";

interface DashboardClientProps {
  contentSummary: {
    products: number;
    blogPosts: number;
  };
}

export default function DashboardClient({ contentSummary }: DashboardClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
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
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 flex-shrink-0">
              <LogOut className="h-4 w-4" />ログアウト
            </Button>
          </div>
        </header>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Products</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading mb-2">{contentSummary.products}</div>
              <p className="text-sm text-muted-foreground mb-4">プロダクト</p>
              <Button asChild variant="ghost" size="sm" className="w-full group">
                <Link href="/admin/products">
                  管理<TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Blog</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading mb-2">{contentSummary.blogPosts}</div>
              <p className="text-sm text-muted-foreground mb-4">記事</p>
              <Button asChild variant="ghost" size="sm" className="w-full group">
                <Link href="/admin/blog">
                  管理<TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-border/50 animate-fade-in-up opacity-0 delay-300">
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
                  編集<TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
