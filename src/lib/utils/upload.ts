import { createClient } from "@/lib/supabase/client";
import { validateFileMagicBytes } from "@/lib/security";

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = "profile-images",
  folder?: string
): Promise<string> {
  // Validate file using Magic Bytes before upload
  const magicBytesValidation = await validateFileMagicBytes(file);
  if (!magicBytesValidation.valid) {
    throw new Error(
      magicBytesValidation.error || "ファイルの検証に失敗しました"
    );
  }

  const supabase = createClient();

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error(`画像のアップロードに失敗しました: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 */
export async function deleteImage(
  url: string,
  bucket: string = "profile-images"
): Promise<void> {
  const supabase = createClient();

  // Extract file path from URL
  const urlParts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (urlParts.length < 2) {
    throw new Error("Invalid image URL");
  }

  const filePath = urlParts[1];

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    throw new Error(`画像の削除に失敗しました: ${error.message}`);
  }
}

/**
 * Validate image file
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "JPG, PNG, WEBP, GIF形式の画像のみアップロード可能です",
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `ファイルサイズは${maxSizeMB}MB以下にしてください`,
    };
  }

  return { valid: true };
}
