import { HeaderClient } from "./HeaderClient";
import { getSocialLinks } from "@/lib/api/profile";
export const Header = async () => {
  const socialLinks = await getSocialLinks();

  return <HeaderClient socialLinks={socialLinks} />;
};
