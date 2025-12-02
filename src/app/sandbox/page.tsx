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

const dummySandboxProjects = [
  {
    id: "1",
    title: "リアルタイムチャットアプリ",
    description: "WebSocketを使用した実験的なチャットアプリケーションです。",
    technologies: ["Node.js", "Socket.IO", "React"],
  },
  {
    id: "2",
    title: "AI画像認識",
    description: "画像内の物体を識別するAIモデルのコンセプト実証です。",
    technologies: ["Python", "TensorFlow", "FastAPI"],
  },
];

export default function SandboxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">サンドボックス</h1>
        <p className="text-lg text-muted-foreground mt-2">実験的、または開発途中のプロジェクト置き場です。</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummySandboxProjects.map((project) => (
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
                <Link href={`/sandbox/${project.id}`}>詳細を見る</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
