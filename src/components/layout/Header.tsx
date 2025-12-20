import { HeaderClient } from "./HeaderClient";
import { getProfile } from "@/lib/api/profile";

export const Header = async () => {
  const profile = await getProfile();

  // Build social links from profile data
  const socialLinks = profile ? {
    x: { url: profile.social_x_url, icon: profile.social_x_icon_url },
    instagram: { url: profile.social_instagram_url, icon: profile.social_instagram_icon_url },
    tiktok: { url: profile.social_tiktok_url, icon: profile.social_tiktok_icon_url },
    youtube: { url: profile.social_youtube_url, icon: profile.social_youtube_icon_url },
    note: { url: profile.social_note_url, icon: profile.social_note_icon_url },
    zenn: { url: profile.social_zenn_url, icon: profile.social_zenn_icon_url },
    qiita: { url: profile.social_qiita_url, icon: profile.social_qiita_icon_url },
    other: { url: profile.social_other_url, icon: profile.social_other_icon_url },
  } : null;

  return <HeaderClient socialLinks={socialLinks} />
};
