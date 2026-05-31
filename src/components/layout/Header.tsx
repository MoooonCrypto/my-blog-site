import { HeaderClient } from "./HeaderClient";
import { getProfile } from "@/lib/api/profile";

const MAX_HEADER_ICONS = 5;

export const Header = async () => {
  const profile = await getProfile();

  const toItem = (link: { platform: string; url: string; icon_url: string | null }) => ({
    platform: link.platform,
    url: link.url,
    icon: link.icon_url ?? null,
  });

  const validLinks = (profile?.social_links ?? []).filter((l) => l.url.trim() !== "");

  const headerSocialLinks = validLinks.slice(0, MAX_HEADER_ICONS).map(toItem);

  return <HeaderClient headerSocialLinks={headerSocialLinks} />;
};
