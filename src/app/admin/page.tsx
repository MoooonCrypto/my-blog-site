"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 実際の구현では、ここでログインロジックを扱います。
    console.log("Login form submitted");
    // 現時点では、ダッシュボードにリダイレクトします。
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">管理画面ログイン</CardTitle>
          <CardDescription>
            アカウントにログインするには、メールアドレスを入力してください。
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">サインイン</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
