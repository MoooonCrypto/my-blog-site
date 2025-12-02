import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dummy data for the dashboard
const contentSummary = {
  portfolio: 3,
  sandbox: 2,
  blogPosts: 3,
};

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">Manage your site&apos;s content from here.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Portfolio Management */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Projects</CardTitle>
            <CardDescription>
              You have {contentSummary.portfolio} projects in your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/portfolio">Manage Portfolio</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Sandbox Management */}
        <Card>
          <CardHeader>
            <CardTitle>Sandbox Projects</CardTitle>
            <CardDescription>
              You have {contentSummary.sandbox} projects in your sandbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/sandbox">Manage Sandbox</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Blog Management */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>
              You have {contentSummary.blogPosts} published blog posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blog">Manage Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
