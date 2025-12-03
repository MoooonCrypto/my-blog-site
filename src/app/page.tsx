import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy data with thumbnail images
const products = [
  {
    id: "1",
    title: "E-commerce Platform",
    thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop",
    type: "portfolio",
  },
  {
    id: "2",
    title: "Real-time Chat App",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=400&fit=crop",
    type: "sandbox",
  },
  {
    id: "3",
    title: "Task Management App",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop",
    type: "portfolio",
  },
  {
    id: "4",
    title: "AI Image Recognition",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=400&fit=crop",
    type: "sandbox",
  },
  {
    id: "5",
    title: "Data Visualization",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
    type: "portfolio",
  },
];

const blogPosts = [
  {
    slug: "hello-world",
    title: "Hello World",
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=400&fit=crop",
    date: "2024.01.15",
  },
  {
    slug: "mastering-react-hooks",
    title: "React Hooks完全ガイド",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
    date: "2024.01.20",
  },
  {
    slug: "nextjs-best-practices",
    title: "Next.js ベストプラクティス",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=400&fit=crop",
    date: "2024.01.25",
  },
  {
    slug: "typescript-tips",
    title: "TypeScript実践テクニック",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=400&fit=crop",
    date: "2024.02.01",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Products Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">プロダクト</h2>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/portfolio">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/${product.type}/${product.id}`}
                  className={`group flex-shrink-0 snap-start animate-fade-in-up opacity-0 delay-${index * 100}`}
                >
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden card-hover border border-border/50">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, transparent 60%, hsl(var(--background))), url(${product.thumbnail})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-heading font-bold text-sm md:text-base line-clamp-2">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">記事一覧</h2>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/blog">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex-shrink-0 snap-start animate-fade-in-up opacity-0 delay-${300 + index * 100}`}
                >
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden card-hover border border-border/50">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, transparent 60%, hsl(var(--background))), url(${post.thumbnail})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-xs text-muted-foreground mb-1">{post.date}</p>
                      <h3 className="font-heading font-bold text-sm md:text-base line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
