/**
 * タイトルからスラッグを生成する
 * 日本語も対応
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // 日本語をローマ字に変換（簡易版）
    .replace(/\s+/g, "-") // スペースをハイフンに
    .replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g, "-") // 特殊文字をハイフンに
    .replace(/\-\-+/g, "-") // 連続したハイフンを1つに
    .replace(/^-+/, "") // 先頭のハイフンを削除
    .replace(/-+$/, "") // 末尾のハイフンを削除
    .substring(0, 100); // 長さを制限
}

/**
 * スラッグのバリデーション
 */
export function validateSlug(slug: string): boolean {
  // 英数字、ハイフン、アンダースコア、日本語のみ許可
  const slugRegex = /^[a-z0-9\-_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
}
