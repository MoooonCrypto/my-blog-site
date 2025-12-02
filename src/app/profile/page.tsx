
const dummyProfile = {
  name: "mokosau",
  title: "フルスタック・ソフトウェアエンジニア",
  bio: "モダンでスケーラブル、そしてユーザーフレンドリーなWebアプリケーションを構築することに情熱を注ぐ開発者です。協調的な環境で能力を発揮し、常に新しい技術を学び、困難な問題を解決することに意欲的です。",
  avatar_url: "https://via.placeholder.com/150", // プレースホルダー画像
  skills: [
    "TypeScript", "React", "Next.js", "Node.js", "Python",
    "PostgreSQL", "Supabase", "Docker", "Git", "Tailwind CSS"
  ],
  experience: [
    {
      title: "シニアデベロッパー at Tech Corp",
      period: "2022 - 現在",
      description: "新しいSaaSプラットフォームの開発を主導し、アーキテクチャとパフォーマンスに重点を置いています。"
    },
    {
      title: "ソフトウェアエンジニア at Innovate LLC",
      period: "2020 - 2022",
      description: "大規模Eコマースアプリケーションの機能開発と保守を担当しました。"
    }
  ]
};

export default function ProfilePage() {
  const profile = dummyProfile;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center gap-8 mb-12">
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-primary"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">{profile.name}</h1>
            <p className="text-xl text-muted-foreground">{profile.title}</p>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">自己紹介</h2>
          <p className="text-lg">{profile.bio}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">スキル</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map(skill => (
              <span key={skill} className="bg-primary text-primary-foreground text-md font-semibold px-4 py-2 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">経歴</h2>
          <div className="space-y-6">
            {profile.experience.map(exp => (
              <div key={exp.title}>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-muted-foreground mb-1">{exp.period}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
