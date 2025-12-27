import { NextRequest } from "next/server";

/**
 * Validate file using Magic Bytes (file signature)
 * Prevents file type spoofing by checking the actual file content
 */
export async function validateFileMagicBytes(
  file: File
): Promise<{ valid: boolean; detectedType?: string; error?: string }> {
  try {
    // Read the first 12 bytes of the file
    const arrayBuffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Magic bytes signatures for common image formats
    const signatures: Record<string, { bytes: (number | null)[][]; type: string }> = {
      jpeg: {
        bytes: [[0xff, 0xd8, 0xff]],
        type: "image/jpeg",
      },
      png: {
        bytes: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
        type: "image/png",
      },
      gif: {
        bytes: [
          [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
          [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
        ],
        type: "image/gif",
      },
      webp: {
        bytes: [[0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50]], // RIFF....WEBP
        type: "image/webp",
      },
    };

    // Check against each signature
    for (const [format, { bytes: sigs, type }] of Object.entries(signatures)) {
      for (const sig of sigs) {
        let match = true;
        for (let i = 0; i < sig.length; i++) {
          if (sig[i] !== null && bytes[i] !== sig[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          // Verify that the file extension matches the detected type
          const declaredType = file.type.toLowerCase();
          if (
            declaredType === type ||
            (type === "image/jpeg" && declaredType === "image/jpg")
          ) {
            return { valid: true, detectedType: type };
          } else {
            return {
              valid: false,
              error: `ファイルの実際の形式（${type}）と拡張子が一致しません`,
            };
          }
        }
      }
    }

    return {
      valid: false,
      error: "サポートされていないファイル形式です",
    };
  } catch (error) {
    return {
      valid: false,
      error: "ファイルの検証中にエラーが発生しました",
    };
  }
}

/**
 * Validate slug format
 * Only allows lowercase alphanumeric characters, hyphens, and underscores
 * Prevents XSS and path traversal attacks
 */
export function validateSlug(slug: string): {
  valid: boolean;
  error?: string;
  sanitized?: string;
} {
  if (!slug || slug.trim() === "") {
    return { valid: false, error: "スラッグは必須です" };
  }

  // Remove leading/trailing whitespace
  const trimmed = slug.trim();

  // Check length
  if (trimmed.length < 1 || trimmed.length > 200) {
    return {
      valid: false,
      error: "スラッグは1文字以上200文字以下にしてください",
    };
  }

  // Only allow: lowercase letters, numbers, hyphens, underscores
  const slugPattern = /^[a-z0-9_-]+$/;
  if (!slugPattern.test(trimmed)) {
    return {
      valid: false,
      error:
        "スラッグには半角英小文字、数字、ハイフン(-)、アンダースコア(_)のみ使用できます",
    };
  }

  // Prevent path traversal
  if (trimmed.includes("..") || trimmed.startsWith("/") || trimmed.startsWith(".")) {
    return {
      valid: false,
      error: "不正なスラッグ形式です",
    };
  }

  // Reserved slugs that could conflict with routes
  const reservedSlugs = [
    "api",
    "admin",
    "blog",
    "portfolio",
    "sandbox",
    "profile",
    "login",
    "logout",
    "settings",
    "_next",
    "static",
  ];
  if (reservedSlugs.includes(trimmed)) {
    return {
      valid: false,
      error: "このスラッグは予約されているため使用できません",
    };
  }

  return { valid: true, sanitized: trimmed };
}

/**
 * Format error message based on environment
 * In production, returns generic error messages to avoid information disclosure
 */
export function formatErrorMessage(
  error: unknown,
  genericMessage: string = "処理中にエラーが発生しました"
): string {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // In production, return generic message only
    return genericMessage;
  }

  // In development, include detailed error information
  if (error instanceof Error) {
    return `${genericMessage}: ${error.message}`;
  }

  return genericMessage;
}

/**
 * CSRF Protection: Validate Origin header
 * Ensures requests come from the same origin
 */
export function validateOrigin(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  // Skip validation for GET and HEAD requests (they should be safe)
  if (request.method === "GET" || request.method === "HEAD") {
    return { valid: true };
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // If no origin header, check referer as fallback
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) {
      // No origin or referer - could be from non-browser client
      // Allow it, but log for monitoring
      return { valid: true };
    }

    try {
      const refererUrl = new URL(referer);
      if (refererUrl.host !== host) {
        return {
          valid: false,
          error: "リクエストの送信元が不正です",
        };
      }
    } catch {
      return {
        valid: false,
        error: "リクエストの送信元が不正です",
      };
    }

    return { valid: true };
  }

  // Validate origin matches host
  try {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      return {
        valid: false,
        error: "リクエストの送信元が不正です",
      };
    }
  } catch {
    return {
      valid: false,
      error: "リクエストの送信元が不正です",
    };
  }

  return { valid: true };
}

/**
 * Sanitize user input to prevent XSS
 * Note: This is basic sanitization. For HTML content, use DOMPurify on the client side.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent basic XSS
    .substring(0, 10000); // Limit length to prevent DoS
}
