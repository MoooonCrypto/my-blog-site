import { NextRequest, NextResponse } from "next/server";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/api/blog";
import { checkAdminAuth } from "@/lib/auth-check";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 認証チェック
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const post = await getBlogPostById(params.id);

    if (!post) {
      return NextResponse.json(
        { error: "記事が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "記事が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "記事の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (data.title !== undefined && data.title.trim() === "") {
      return NextResponse.json(
        { error: "タイトルは必須です。" },
        { status: 400 }
      );
    }

    if (data.slug !== undefined && data.slug.trim() === "") {
      return NextResponse.json(
        { error: "スラッグは必須です。" },
        { status: 400 }
      );
    }

    if (data.content !== undefined && data.content.trim() === "") {
      return NextResponse.json(
        { error: "本文は必須です。" },
        { status: 400 }
      );
    }

    // データベースを更新
    const post = await updateBlogPost(params.id, data);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);

    if (error instanceof Error) {
      // 重複エラーの検出
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return NextResponse.json(
          { error: "このスラッグは既に使用されています。別のスラッグを指定してください。" },
          { status: 409 }
        );
      }

      // 見つからないエラー
      if (error.message.includes("not found")) {
        return NextResponse.json(
          { error: "記事が見つかりませんでした。" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: `記事の更新に失敗しました: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "記事の更新に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 認証チェック
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    await deleteBlogPost(params.id);

    return NextResponse.json({ success: true, message: "記事を削除しました。" });
  } catch (error) {
    console.error("Error deleting blog post:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "記事が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "記事の削除に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}
