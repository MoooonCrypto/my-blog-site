import Image from "next/image";
import { getProfile } from "@/lib/api/profile";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Github, Linkedin } from "lucide-react";

export const dynamic = "force-dynamic";

const PLATFORM_LABEL: Record<string, string> = {
  x: "X (Twitter)", instagram: "Instagram", tiktok: "TikTok",
  youtube: "YouTube", note: "note", zenn: "Zenn", qiita: "Qiita", other: "その他",
};

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">プロフィール情報が見つかりません</p>
      </div>
    );
  }

  const socialLinks = profile.social_links ?? [];

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-mesh opacity-50" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center gap-8 mb-12 animate-fade-in-up opacity-0">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.name}
              width={150}
              height={150}
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
              priority
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-primary bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-muted-foreground">
                {profile.name?.charAt(0) ?? "?"}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-heading font-bold tracking-tight">{profile.name}</h1>
            {profile.title && (
              <p className="text-xl text-muted-foreground mt-1">{profile.title}</p>
            )}
          </div>
        </header>

        {/* Bio */}
        {profile.bio && (
          <section className="mb-12 animate-fade-in-up opacity-0 delay-100">
            <h2 className="text-2xl font-heading font-bold border-b pb-2 mb-6">About Me</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
          </section>
        )}

        {/* Contact */}
        {(profile.email || profile.website_url || profile.github_url || profile.linkedin_url) && (
          <section className="mb-12 animate-fade-in-up opacity-0 delay-200">
            <h2 className="text-2xl font-heading font-bold border-b pb-2 mb-6">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.email && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={`mailto:${profile.email}`}><Mail className="mr-2 h-4 w-4" />{profile.email}</a>
                </Button>
              )}
              {profile.website_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.website_url} target="_blank" rel="noopener noreferrer"><Globe className="mr-2 h-4 w-4" />Website</a>
                </Button>
              )}
              {profile.github_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />GitHub</a>
                </Button>
              )}
              {profile.linkedin_url && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</a>
                </Button>
              )}
            </div>
          </section>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <section className="animate-fade-in-up opacity-0 delay-300">
            <h2 className="text-2xl font-heading font-bold border-b pb-2 mb-6">Social Media</h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Button key={link.id} variant="outline" size="lg" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.icon_url ? (
                      <Image src={link.icon_url} alt={link.platform} width={20} height={20} className="mr-2 rounded-sm" />
                    ) : (
                      <span className="mr-2 text-base">🔗</span>
                    )}
                    {PLATFORM_LABEL[link.platform] ?? link.platform}
                  </a>
                </Button>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
