import { HeaderClient } from "./HeaderClient";
import { getProfile } from "@/lib/api/profile";

export const Header = async () => {
  const profile = await getProfile();

  const socialLinks = profile?.social_links
    ? profile.social_links
        .filter((link) => link.url.trim() !== "")
        .map((link) => ({
          platform: link.platform,
          url: link.url,
          icon: link.icon_url ?? null,
        }))
    : [];

  return <HeaderClient socialLinks={socialLinks} />;
};
