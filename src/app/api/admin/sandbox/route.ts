import { NextRequest, NextResponse } from "next/server";
import { createSandboxItem } from "@/lib/api/sandbox";
import { checkAdminAuth } from "@/lib/auth-check";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // リクエストボディの取得
    let data;
    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "不正なリクエスト形式です。" },
        { status: 400 }
      );
    }

    // バリデーション
    if (!data.title || data.title.trim() === "") {
      return NextResponse.json(
        { error: "タイトルは必須です。" },
        { status: 400 }
      );
    }

    if (!data.slug || data.slug.trim() === "") {
      return NextResponse.json(
        { error: "スラッグは必須です。" },
        { status: 400 }
      );
    }

    if (!data.description || data.description.trim() === "") {
      return NextResponse.json(
        { error: "説明は必須です。" },
        { status: 400 }
      );
    }

    // データベースに保存
    const item = await createSandboxItem(data);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating sandbox item:", error);

    // エラーメッセージの詳細化
    if (error instanceof Error) {
      // 重複エラーの検出
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return NextResponse.json(
          { error: "このスラッグは既に使用されています。別のスラッグを指定してください。" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: `Sandboxアイテムの作成に失敗しました: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Sandboxアイテムの作成に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}
