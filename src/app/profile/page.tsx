import Image from "next/image";

const dummyProfile = {
  name: "Jules",
  title: "Full-Stack Software Engineer",
  bio: "I am a passionate developer with a knack for building modern, scalable, and user-friendly web applications. I thrive in collaborative environments and am always eager to learn new technologies and solve challenging problems.",
  avatar_url: "https://via.placeholder.com/150", // Placeholder image
  skills: [
    "TypeScript", "React", "Next.js", "Node.js", "Python",
    "PostgreSQL", "Supabase", "Docker", "Git", "Tailwind CSS"
  ],
  experience: [
    {
      title: "Senior Developer at Tech Corp",
      period: "2022 - Present",
      description: "Leading the development of a new SaaS platform, focusing on architecture and performance."
    },
    {
      title: "Software Engineer at Innovate LLC",
      period: "2020 - 2022",
      description: "Developed and maintained features for a large-scale e-commerce application."
    }
  ]
};

export default function ProfilePage() {
  const profile = dummyProfile;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center gap-8 mb-12">
          <Image
            src={profile.avatar_url}
            alt={profile.name}
            width={150}
            height={150}
            className="w-32 h-32 rounded-full border-4 border-primary"
            priority={true}
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">{profile.name}</h1>
            <p className="text-xl text-muted-foreground">{profile.title}</p>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">About Me</h2>
          <p className="text-lg">{profile.bio}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map(skill => (
              <span key={skill} className="bg-primary text-primary-foreground text-md font-semibold px-4 py-2 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">Experience</h2>
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
