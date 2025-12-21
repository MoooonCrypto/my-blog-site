import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/lib/api/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Github, Linkedin } from "lucide-react";

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
          <section className="mb-12">
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

        {/* Contact Information */}
        {(profile.email || profile.website_url || profile.github_url || profile.linkedin_url) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.email && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    {profile.email}
                  </a>
                </Button>
              )}
              {profile.website_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}
              {profile.github_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {profile.linkedin_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </section>
        )}

        {/* Social Links */}
        {(profile.social_x_url || profile.social_instagram_url || profile.social_tiktok_url ||
          profile.social_youtube_url || profile.social_note_url || profile.social_zenn_url ||
          profile.social_qiita_url || profile.social_other_url) && (
          <section>
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">Social Media</h2>
            <div className="flex flex-wrap gap-4">
              {profile.social_x_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_x_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_x_icon_url ? (
                      <Image src={profile.social_x_icon_url} alt="X" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">𝕏</span>
                    )}
                    X (Twitter)
                  </a>
                </Button>
              )}
              {profile.social_instagram_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_instagram_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_instagram_icon_url ? (
                      <Image src={profile.social_instagram_icon_url} alt="Instagram" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">📷</span>
                    )}
                    Instagram
                  </a>
                </Button>
              )}
              {profile.social_tiktok_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_tiktok_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_tiktok_icon_url ? (
                      <Image src={profile.social_tiktok_icon_url} alt="TikTok" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">🎵</span>
                    )}
                    TikTok
                  </a>
                </Button>
              )}
              {profile.social_youtube_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_youtube_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_youtube_icon_url ? (
                      <Image src={profile.social_youtube_icon_url} alt="YouTube" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">▶️</span>
                    )}
                    YouTube
                  </a>
                </Button>
              )}
              {profile.social_note_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_note_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_note_icon_url ? (
                      <Image src={profile.social_note_icon_url} alt="note" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">📝</span>
                    )}
                    note
                  </a>
                </Button>
              )}
              {profile.social_zenn_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_zenn_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_zenn_icon_url ? (
                      <Image src={profile.social_zenn_icon_url} alt="Zenn" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">📘</span>
                    )}
                    Zenn
                  </a>
                </Button>
              )}
              {profile.social_qiita_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_qiita_url} target="_blank" rel="noopener noreferrer">
                    {profile.social_qiita_icon_url ? (
                      <Image src={profile.social_qiita_icon_url} alt="Qiita" width={20} height={20} className="mr-2" />
                    ) : (
                      <span className="mr-2">📗</span>
                    )}
                    Qiita
                  </a>
                </Button>
              )}
              {profile.social_other_url && profile.social_other_icon_url && (
                <Button variant="outline" size="lg" asChild>
                  <a href={profile.social_other_url} target="_blank" rel="noopener noreferrer">
                    <Image src={profile.social_other_icon_url} alt="はてなブログ" width={20} height={20} className="mr-2" />
                    はてなブログ
                  </a>
                </Button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
