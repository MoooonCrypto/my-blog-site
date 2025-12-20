import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProfile, updateProfile } from "@/lib/api/profile";
import { checkAdminAuth } from "@/lib/auth-check";

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
    // 認証チェック（既存のパターンに合わせる）
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    console.log("Received profile update request:", body);

    // バリデーション: 氏名は必須
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { error: "氏名は必須です" },
        { status: 400 }
      );
    }

    // Get current profile to find the ID
    const currentProfile = await getProfile();
    console.log("Current profile ID:", currentProfile?.id);

    if (!currentProfile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Update profile
    const updatedProfile = await updateProfile(currentProfile.id, body);
    console.log("Profile updated successfully:", updatedProfile);

    // プロフィールページのキャッシュを無効化
    revalidatePath("/profile");
    revalidatePath("/admin/profile");

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
