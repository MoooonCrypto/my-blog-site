import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyProjects = [
  {
    id: "1",
    title: "Eコマースプラットフォーム",
    description: "Next.js, TypeScript, Stripeを利用して構築した、本格的なEコマースプラットフォームです。",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "タスク管理アプリ",
    description: "リアルタイム更新機能を備えた、共同作業向けタスク管理アプリケーションです。",
    technologies: ["React", "Firebase", "Material-UI"],
  },
  {
    id: "3",
    title: "データ可視化ダッシュボード",
    description: "D3.jsを用いて複雑なデータセットを視覚化するためのダッシュボードです。",
    technologies: ["React", "D3.js", "Express", "Node.js"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">ポートフォリオ</h1>
        <p className="text-lg text-muted-foreground mt-2">私が作成したプロダクトやサービスの一覧です。</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-secondary text-secondary-foreground text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/portfolio/${project.id}`}>詳細を見る</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
