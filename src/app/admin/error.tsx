"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-md">
      <h2 className="text-2xl font-heading font-bold mb-4">エラーが発生しました</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        管理画面の読み込みに失敗しました。
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-6 font-mono">
          Digest: {error.digest}
        </p>
      )}
      <div className="flex gap-3 justify-center">
        <Button onClick={reset} variant="default">
          再試行
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">ダッシュボードへ</Link>
        </Button>
      </div>
    </div>
  );
}
