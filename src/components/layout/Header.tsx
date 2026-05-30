import { HeaderClient } from "./HeaderClient";
import { getProfile } from "@/lib/api/profile";

export const Header = async () => {
  const profile = await getProfile();

  const toItem = (link: { platform: string; title: string | null; url: string; icon_url: string | null }) => ({
    platform: link.platform,
    title: link.title ?? null,
    url: link.url,
    icon: link.icon_url ?? null,
  });

  const validLinks = (profile?.social_links ?? []).filter((l) => l.url.trim() !== "");

  const headerSocialLinks = validLinks
    .filter((l) => l.show_in_header)
    .slice(0, 5)
    .map(toItem);

  const allSocialLinks = validLinks.map(toItem);

  return <HeaderClient headerSocialLinks={headerSocialLinks} allSocialLinks={allSocialLinks} />;
};
