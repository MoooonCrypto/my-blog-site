import { NextRequest, NextResponse } from "next/server";
import { createBlogPost } from "@/lib/api/blog";
import { checkAdminAuth } from "@/lib/auth-check";
import {
  validateSlug,
  formatErrorMessage,
  validateOrigin,
  sanitizeInput,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    // CSRF対策: Originヘッダーチェック
    const originValidation = validateOrigin(request);
    if (!originValidation.valid) {
      return NextResponse.json(
        { error: originValidation.error },
        { status: 403 }
      );
    }

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

    // Slugのサーバーサイドバリデーション
    const slugValidation = validateSlug(data.slug);
    if (!slugValidation.valid) {
      return NextResponse.json(
        { error: slugValidation.error },
        { status: 400 }
      );
    }

    if (!data.content || data.content.trim() === "") {
      return NextResponse.json(
        { error: "本文は必須です。" },
        { status: 400 }
      );
    }

    // Sanitize title and excerpt to prevent XSS
    data.title = sanitizeInput(data.title);
    if (data.excerpt) {
      data.excerpt = sanitizeInput(data.excerpt);
    }
    // Use validated/sanitized slug
    data.slug = slugValidation.sanitized;

    // データベースに保存
    const post = await createBlogPost(data);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    // エラーメッセージの詳細化（開発環境のみ）
    if (error instanceof Error) {
      // 重複エラーの検出
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return NextResponse.json(
          { error: "このスラッグは既に使用されています。別のスラッグを指定してください。" },
          { status: 409 }
        );
      }

      // 本番環境では詳細なエラーを隠す
      const errorMessage = formatErrorMessage(
        error,
        "記事の作成に失敗しました"
      );
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    return NextResponse.json(
      { error: "記事の作成に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}
