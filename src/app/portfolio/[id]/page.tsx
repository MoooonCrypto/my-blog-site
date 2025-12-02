import Link from "next/link";
import { Button } from "@/components/ui/button";

// ダミーデータ
const dummyProject = {
  id: "1",
  title: "Eコマースプラットフォーム",
  description: "スケーラビリティとパフォーマンスを重視して設計された、包括的なEコマースソリューションです。レスポンシブデザイン、Stripeによる安全な決済処理、商品・注文・顧客管理のための完全な管理ダッシュボードを備えています。",
  technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
  project_url: "https://example.com",
  github_url: "https://github.com/example/ecommerce",
  long_description: "<p>このプロジェクトは、モダンで高速、かつ信頼性の高いオンラインストアをゼロから構築することを目的としています...</p>",
};

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const project = dummyProject;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </header>

        <div className="mb-8">
          <img
            src="https://via.placeholder.com/1200x600" // プレースホルダー画像
            alt={project.title}
            className="w-full h-auto rounded-lg border"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.long_description }} />

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">使用技術</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-secondary text-secondary-foreground text-sm font-semibold mr-2 px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {project.project_url && (
            <Button asChild>
              <Link href={project.project_url} target="_blank" rel="noopener noreferrer">
                サイトを見る
              </Link>
            </Button>
          )}
          {project.github_url && (
            <Button variant="secondary" asChild>
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                GitHubで見る
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
