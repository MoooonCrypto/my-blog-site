import Image from "next/image";
import { getProfile } from "@/lib/api/profile";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">プロフィール情報が見つかりません</p>
        </div>
      </div>
    );
  }

  // Parse skills and experience from JSON
  const skills = profile.skills ? (Array.isArray(profile.skills) ? profile.skills : []) : [];
  const experience = profile.experience ? (Array.isArray(profile.experience) ? profile.experience : []) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center gap-8 mb-12">
          {profile.avatar_url && profile.avatar_url.trim() !== "" ? (
            <Image
              src={profile.avatar_url}
              alt={profile.name}
              width={150}
              height={150}
              className="w-32 h-32 rounded-full border-4 border-primary"
              priority={true}
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-primary bg-muted flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground">
                {profile.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">{profile.name || "名無し"}</h1>
            {profile.title && profile.title.trim() !== "" && (
              <p className="text-xl text-muted-foreground">{profile.title}</p>
            )}
          </div>
        </header>

        {profile.bio && profile.bio.trim() !== "" && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">About Me</h2>
            <p className="text-lg">{profile.bio}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Badge key={index} variant="default" className="text-md px-4 py-2">
                  {String(skill)}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={index}>
                  <h3 className="text-xl font-bold">{exp.title || exp.position}</h3>
                  <p className="text-muted-foreground mb-1">{exp.period || exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
