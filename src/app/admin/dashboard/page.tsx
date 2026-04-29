import { getAllBlogPosts } from "@/lib/api/blog";
import { getAllProducts } from "@/lib/api/products";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [blogPosts, products] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllProducts().catch(() => []),
  ]);

  return (
    <DashboardClient
      contentSummary={{
        products: products.length,
        blogPosts: blogPosts.length,
      }}
    />
  );
}
