import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProfile, updateProfile } from "@/lib/api/profile";
import { checkAdminAuth } from "@/lib/auth-check";
import {
  formatErrorMessage,
  validateOrigin,
  sanitizeInput,
} from "@/lib/security";

export async function GET() {
  try {
    const profile = await getProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // CSRF対策
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

    const body = await request.json();

    // バリデーション: 氏名は必須
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { error: "氏名は必須です" },
        { status: 400 }
      );
    }

    // Sanitize user inputs
    if (body.name) body.name = sanitizeInput(body.name);
    if (body.title) body.title = sanitizeInput(body.title);
    if (body.bio) body.bio = sanitizeInput(body.bio);

    // Get current profile to find the ID
    const currentProfile = await getProfile();

    if (!currentProfile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Update profile
    const updatedProfile = await updateProfile(currentProfile.id, body);

    // プロフィールページのキャッシュを無効化
    revalidatePath("/profile");
    revalidatePath("/admin/profile");

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    const errorMessage = formatErrorMessage(
      error,
      "プロフィールの更新に失敗しました"
    );
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
